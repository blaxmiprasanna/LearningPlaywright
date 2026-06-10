pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npx playwright --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --project chromium'
            }
        }

    }

    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            emailext(
                subject: "Playwright Test Results - ${currentBuild.currentResult}",
                body: """
Build Status: ${currentBuild.currentResult}

Build URL:
${BUILD_URL}

Playwright Report:
${BUILD_URL}Playwright_Report/
""",
                to: "botty.prasanna@gmail.com"
            )
        }
    }

}