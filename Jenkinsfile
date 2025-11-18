pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                script {
                    def safe = env.BRANCH_NAME.replace('/', '-')
                    env.SAFE_BRANCH = safe
                }
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    bat """
                    if not exist node_modules (
                        npm install
                    )
                    if not exist dist (
                        npm run build
                    )
                    """
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat """
                    if not exist node_modules (
                        npm install
                    )
                    if not exist dist (
                        npm run build
                    )
                    """
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat """
                docker compose ps > status.txt
                findstr /C:"Up" status.txt >nul
                if errorlevel 1 (
                    docker compose up -d --build
                ) else (
                    echo Los contenedores ya estan corriendo
                )
                """
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
