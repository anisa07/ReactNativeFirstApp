package com.layoutandstylesrn;

import android.widget.Toast;
import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;
import java.io.*;
import org.json.JSONArray;


public class NativeStorage extends ReactContextBaseJavaModule {

    @Override
    public String getName() {
        return "NativeStorage";
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void getItem(Promise promise) {
        String fileName = "NativeStorageTest4.txt";
        String value = "";

        try {
            // Open stream to read file.
            FileInputStream in =  getReactApplicationContext().openFileInput(fileName);

            BufferedReader br = new BufferedReader(new InputStreamReader(in));

            StringBuilder sb = new StringBuilder();
            String s= null;
            while((s= br.readLine())!= null)  {
                sb.append(s).append("\n");
            }

            promise.resolve(sb.toString());
        }
        catch (Exception e) {
           promise.resolve("");
        }
    }

    @ReactMethod
    public void setItem(String content) {
        String fileName = "NativeStorageTest4.txt";
        FileOutputStream outputStream;
        File file = new File(getReactApplicationContext().getFilesDir(), fileName);

        try {
            outputStream = getReactApplicationContext().openFileOutput(fileName, Context.MODE_PRIVATE);
            outputStream.write(content.getBytes());
            outputStream.close();
        } catch (Exception e) {
            this.show("File write failed: " + e.toString(), 10);
        }
    }

    public NativeStorage(ReactApplicationContext reactContext) {
        super(reactContext);
    }
}
