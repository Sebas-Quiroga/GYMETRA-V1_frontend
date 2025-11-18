pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build admin-frontend') {
            steps {
                dir('frontend/admin-frontend') {
                    bat '''
                        echo Instalando dependencias...
                        call npm install

                        echo Construyendo proyecto...
                        call npm run build
                    '''
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat '''
                        echo Instalando dependencias...
                        call npm install

                        echo Construyendo proyecto...
                        call npm run build
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat '''
                    echo Ejecutando docker compose...
                    docker-compose down
                    docker-compose up -d --build
                '''
            }
        }
    }

    post {
        always {
            bat '''
                echo "Pipeline terminado (Windows)"
            '''
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
