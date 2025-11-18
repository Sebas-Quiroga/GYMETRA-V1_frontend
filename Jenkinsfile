pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm

                script {
                    // Obtener la rama real desde Git
                    def branch = sh(
                        script: "git rev-parse --abbrev-ref HEAD",
                        returnStdout: true
                    ).trim()

                    // Reemplazar "/" por "-"
                    env.SAFE_BRANCH = branch.replace('/', '-')

                    echo "Rama detectada: ${branch}"
                    echo "SAFE_BRANCH: ${env.SAFE_BRANCH}"
                }
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    bat '''
                        if not exist node_modules (
                            echo Instalando dependencias...
                            call npm install
                        )

                        if not exist dist (
                            echo Construyendo proyecto...
                            call npm run build
                        )
                    '''
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat '''
                        if not exist node_modules (
                            echo Instalando dependencias...
                            call npm install
                        )

                        if not exist dist (
                            echo Construyendo proyecto...
                            call npm run build
                        )
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat '''
                    docker compose ps > status.txt

                    findstr /C:"Up" status.txt
                    if %ERRORLEVEL%==0 (
                        echo Servicios ya levantados.
                    ) else (
                        echo Levantando servicios...
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
