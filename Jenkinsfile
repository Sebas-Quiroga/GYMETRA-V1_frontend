pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm

                script {
                    // Obtener la rama desde Jenkins
                    def branchName = env.BRANCH_NAME ?: "desconocida"
                    def safeBranch = branchName.replace('/', '-')
                    env.SAFE_BRANCH = safeBranch

                    echo "Rama detectada: ${branchName}"
                    echo "SAFE_BRANCH: ${env.SAFE_BRANCH}"
                }
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    bat '''
                        echo === ADMIN FRONTEND ===

                        if not exist node_modules (
                            echo Instalando dependencias...
                            npm install
                        )

                        if not exist dist (
                            echo Construyendo proyecto...
                            npm run build
                        )
                    '''
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat '''
                        echo === GYMETRA FRONTEND ===

                        if not exist node_modules (
                            echo Instalando dependencias...
                            npm install
                        )

                        if not exist dist (
                            echo Construyendo proyecto...
                            npm run build
                        )
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat '''
                    echo === DEPLOY DOCKER COMPOSE ===

                    docker compose ps > status.txt

                    findstr /C:"Up" status.txt
                    if %ERRORLEVEL%==0 (
                        echo Servicios ya estan levantados. No se ejecuta deploy.
                    ) else (
                        echo Servicios no estan arriba. Ejecutando docker compose up...
                        docker compose up -d --build
                    )
                '''
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado."
        }
        failure {
            echo "El pipeline falló."
        }
    }
}
