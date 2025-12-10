plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.example.mul"
    compileSdk {
        version = release(36)
    }

    defaultConfig {
        applicationId = "com.example.mul"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        getByName("debug") {
            // 调试构建类型
//            buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", "false")
        }
        create("profile") {
            // 添加 profile 构建类型，用于 Flutter 性能分析
            initWith(getByName("debug"))
//            buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", "false")
        }
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
//            buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", "false")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
}

dependencies {
    // Flutter module
    debugImplementation("com.example.flutter_module:flutter_debug:1.0")
    "profileImplementation"("com.example.flutter_module:flutter_profile:1.0")
    releaseImplementation("com.example.flutter_module:flutter_release:1.0")



    // SoLoader for native lib loading
    implementation("com.facebook.soloader:soloader:0.11.0")

//加号是为了自动下载最新0.72的
    implementation("com.facebook.react:react-android:0.82.1")
    3//hermes 解决lib so 缺失
    implementation("com.facebook.react:hermes-android:0.82.1")

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}