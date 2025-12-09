package com.example.mul

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.mul.ui.theme.MulAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MulAppTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) {
                    innerPadding ->
                    MainScreen(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable
fun MainScreen(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val items = listOf("原型", "compose", "flutter", "RN")
    
    LazyColumn(modifier = modifier.fillMaxSize()) {
        items(items) {
            item ->
            Text(
                text = item,
                modifier = Modifier
                    .padding(24.dp)
                    .clickable {
                        when (item) {
                            "flutter" -> {
                                // 跳转到 Flutter 界面
                                context.startActivity(Intent(context, FlutterScreenActivity::class.java))
                            }
                            "RN" -> {
                                // 跳转到 React Native 界面
                                context.startActivity(Intent(context, RNMainActivity::class.java))
                            }
                            else -> {
                                // 原型和 compose 不做任何操作
                            }
                        }
                    }
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    MulAppTheme {
        MainScreen()
    }
}