pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm

                script {
                    // Obtener la rama actual
                    def branch = bat(
                        script: 'git rev-parse --abbrev-ref HEAD',
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
                        echo Instalando dependencias...
                        if not exist node_modules (
                            call npm install
                        ) else (
                            echo node_modules ya existe. Saltando instalación...
                        )

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
                        if not exist node_modules (
                            call npm install
                        ) else (
                            echo node_modules ya existe. Saltando instalación...
                        )

                        echo Construyendo proyecto...
                        call npm run build
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat '''
                    echo Verificando estado de los servicios Docker...
                    docker compose ps > status.txt

                    findstr /C:"Up" status.txt
                    if %ERRORLEVEL%==0 (
                        echo Servicios ya levantados. No se recrean.
                    ) else (
                        echo Levantando servicios con build...
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
