package com.example.mul

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity

/**
 * React Native 启动 Activity
 * 由于 RN 0.82 使用 New Architecture，brownfield 集成需要完整的原生库构建
 * 这里采用启动独立 RN 应用的方式
 */
class RNMainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // 尝试启动 RN 模块的独立应用
        val rnPackageName = "com.rn_module"
        val intent = packageManager.getLaunchIntentForPackage(rnPackageName)
        
        if (intent != null) {
            startActivity(intent)
            finish()
        } else {
            // RN 应用未安装，显示提示
            Toast.makeText(
                this, 
                "请先安装 RN 模块应用：\ncd rn_module && npm run android", 
                Toast.LENGTH_LONG
            ).show()
            finish()
        }
    }
}
