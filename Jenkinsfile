pipeline {
    agent any

    environment {
        DOCKER_IMAGE_PREFIX = 'develop-'
        DOCKER_REGISTRY = 'your-registry.com'
    }

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
                    set IMAGE_EXISTS=0
                    for /f %%i in ('docker images -q %DOCKER_IMAGE_PREFIX%admin-frontend:latest') do set IMAGE_EXISTS=1
                    if %IMAGE_EXISTS%==0 (
                        echo Building admin-frontend image...
                        docker build --no-cache -t %DOCKER_IMAGE_PREFIX%admin-frontend:latest .
                    ) else (
                        echo admin-frontend image already exists, skipping build.
                    )
                    '''
                }
            }
        }

        stage('Build gymetra-frontend') {
            steps {
                dir('frontend/gymetra-frontend') {
                    bat '''
                    set IMAGE_EXISTS=0
                    for /f %%i in ('docker images -q %DOCKER_IMAGE_PREFIX%gymetra-frontend:latest') do set IMAGE_EXISTS=1
                    if %IMAGE_EXISTS%==0 (
                        echo Building gymetra-frontend image...
                        docker build --no-cache -t %DOCKER_IMAGE_PREFIX%gymetra-frontend:latest .
                    ) else (
                        echo gymetra-frontend image already exists, skipping build.
                    )
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            bat 'docker system prune -f'
        }
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
