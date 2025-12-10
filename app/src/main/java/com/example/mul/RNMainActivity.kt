package com.example.mul

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import com.facebook.react.ReactActivity
import com.facebook.react.ReactPackage

/**
 * React Native 启动 Activity
 * 由于 RN 0.82 使用 New Architecture，brownfield 集成需要完整的原生库构建
 * 这里采用启动独立 RN 应用的方式
 */
class RNMainActivity : ReactActivity() {
    override fun getMainComponentName(): String? {
        return "MulApp"
    }

    fun getUseDeveloperSupport(): Boolean {
        TODO("Not yet implemented")
    }

    fun getPackages(): List<ReactPackage?>? {
        TODO("Not yet implemented")
    }

}
