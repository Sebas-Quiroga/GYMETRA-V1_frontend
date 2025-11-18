pipeline {
    agent any


    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    // Obtener la rama actual de Git
                    def branchOutput = bat(
                        script: 'git rev-parse --abbrev-ref HEAD',
                        returnStdout: true
                    )
                    def branchName = branchOutput.trim()
                    
                    // Reemplazar "/" por "-" en el nombre de la rama
                    def branchPrefix = branchName.replaceAll('/', '-')
                    env.BRANCH_PREFIX = branchPrefix
                    echo "Branch detected: ${branchName}, using prefix: ${branchPrefix}"
                    
                    // Actualizar docker-compose.yml con el prefijo de rama
                    def composeContent = readFile('docker-compose.yml')
                    composeContent = composeContent.replaceAll('container_name: [^\\s]+-admin-frontend', "container_name: ${branchPrefix}-admin-frontend")
                    composeContent = composeContent.replaceAll('container_name: [^\\s]+-gymetra-frontend', "container_name: ${branchPrefix}-gymetra-frontend")
                    writeFile file: 'docker-compose.yml', text: composeContent
                }
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    script {
                        def nodeModulesExists = bat(
                            script: 'if exist node_modules (exit 0) else (exit 1)',
                            returnStatus: true
                        ) == 0
                        
                        if (!nodeModulesExists) {
                            bat 'npm install'
                        }
                        
                        def distExists = bat(
                            script: 'if exist dist (exit 0) else (exit 1)',
                            returnStatus: true
                        ) == 0
                        
                        if (!distExists) {
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    script {
                        def nodeModulesExists = bat(
                            script: 'if exist node_modules (exit 0) else (exit 1)',
                            returnStatus: true
                        ) == 0
                        
                        if (!nodeModulesExists) {
                            bat 'npm install'
                        }
                        
                        def distExists = bat(
                            script: 'if exist dist (exit 0) else (exit 1)',
                            returnStatus: true
                        ) == 0
                        
                        if (!distExists) {
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Verificar si hay servicios corriendo (Up)
                    def composeOutput = bat(
                        script: 'docker compose ps',
                        returnStdout: true
                    )
                    
                    def servicesUp = composeOutput.contains('Up')
                    
                    if (!servicesUp) {
                        bat 'docker compose up -d --build'
                    } else {
                        echo 'Services are already up, skipping deployment'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed'
        }
        failure {
            echo 'Pipeline execution failed'
        }
    }
}
