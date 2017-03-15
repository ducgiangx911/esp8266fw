/**
 * httpUpdate.ino
 *
 *  Created on: 27.11.2015
 *
 */

//#include <Arduino.h>

#include <ESP8266WiFi.h>
//#include <ESP8266WiFiMulti.h>

//#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>

#define USE_SERIAL Serial

//ESP8266WiFiMulti WiFiMulti;

void setup() {

    USE_SERIAL.begin(115200);
    // USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    WiFi.disconnect();
    delay(1000);
    
    WiFi.begin("VIETHAN_VNPT","0914057975");
    while(WiFi.status()!=WL_CONNECTED) {
      delay(500);
      Serial.println(".");
    }

}

void loop() {
    // wait for WiFi connection'
     USE_SERIAL.printf("Chuan bi download");
    if((WiFi.status() == WL_CONNECTED)) {

        t_httpUpdate_return ret = ESPhttpUpdate.update("192.168.1.123", 3000, "/FW.BIN");
        //t_httpUpdate_return  ret = ESPhttpUpdate.update("https://server/file.bin");

        switch(ret) {
            case HTTP_UPDATE_FAILED:
                USE_SERIAL.printf("HTTP_UPDATE_FAILD Error (%d): %s", ESPhttpUpdate.getLastError(), ESPhttpUpdate.getLastErrorString().c_str());
                break;

            case HTTP_UPDATE_NO_UPDATES:
                USE_SERIAL.println("HTTP_UPDATE_NO_UPDATES");
                break;

            case HTTP_UPDATE_OK:
                USE_SERIAL.println("HTTP_UPDATE_OK");
                break;
        }
    }
}

