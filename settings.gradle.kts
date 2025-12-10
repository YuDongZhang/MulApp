pluginManagement {

    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_PROJECT)
    repositories {
        google()
        mavenCentral()
        // Flutter module release repository
        maven {
            url = uri("${rootProject.projectDir}/flutter_module/build/host/outputs/repo")
        }
        maven {
            url = uri("https://storage.googleapis.com/download.flutter.io")
        }


// ✅ ✅ ✅ 关键：React Native 官方 Android 本地 Maven 仓库
        maven {
            url = uri("$rootDir/node_modules/react-native/android")
        }

        // ✅ Hermes 官方仓库（防止 hermes so 丢失）
        maven {
            url = uri(
                "https://repo.maven.apache.org/maven2"
            )
        }
    }
}

rootProject.name = "MulApp"
include(":app")

