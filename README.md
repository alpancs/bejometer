# Bejometer
***Alat ukur kabegjan.***

Sebagai sebuah alat ukur, Bejometer selalu memberikan hasil yang konsisten. Bejometer menghitung dengan seksama setiap detil nama dan tanggal yang dimasukkan, tidak asal mengeluarkan angka acak sebagai hasil.

Satu hal yang perlu digarisbawahi dari Bejometer adalah, bahwa hasil perhitungannya bukanlah ramalan. Bejometer sekedar mengukur dengan perhitungan matematis.

https://bejometer.herokuapp.com

<a href='https://play.google.com/store/apps/details?id=id.prihantoro.bejometer&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/badge_new.png'/></a>


# API
## `GET /api/bejometer`
  - Query
    - `name1: string`
    - `date1: string` (format: YYYY-MM-DD)
    - `name2: string`
    - `date2: string` (format: YYYY-MM-DD)
  - Example
    - Request:
    ```
    GET /api/bejometer?name1=alfan&date1=1994-02-27&name2=ayu&date2=1996-02-01
    ```
    - Response:
    ```
    {"match":0.13107706355252005,"person1":{"gender":"L","genderConfidence":0.9999998106680987,"indonesiaDay":"AHAD","javaDay":"PAHING"},"person2":{"gender":"P","genderConfidence":0.7427701674277016,"indonesiaDay":"KAMIS","javaDay":"LEGI"}}
    ```

## `GET /api/tebakgender`
  - Query
    - `name: string`
  - Example
    - Request:
    ```
    GET /api/tebakgender?name=alfan
    ```
    - Response:
    ```
    {"gender":"L","confidence":0.9999998106680987}
    ```

## `GET /api/bulk-tebakgender`
  - Query
    - `names: array of string`
  - Example
    - Request:
    ```
    GET /api/bulk-tebakgender?names=alfan&names=ayu
    ```
    - Response:
    ```
    [{"gender":"L","confidence":0.9999998106680987},{"gender":"P","confidence":0.7427701674277016}]
    ```

## `GET /api/consultation`
  - Query
    - `name: string`
    - `date: string` (format: YYYY-MM-DD)
    - `limit: int` (optional, default 6)
  - Example
    - Request:
    ```
    GET /api/consultation?name=alfan&date=1994-02-10
    ```
    - Response:
    ```
    {"person":{"gender":"L","genderConfidence":0.9999998106680987},"suggestions":[{"match":0.9999995639894148,"name":"WINDIYAWATI","placeOfBirth":"BANDUNG","dateOfBirth":"1997-11-01"},{"match":0.9999990141406223,"name":"ANITA","placeOfBirth":"BANDUNG BARAT","dateOfBirth":"2004-09-09"},{"match":0.9999998101696326,"name":"SILFANI DEWI","placeOfBirth":"KARAWANG","dateOfBirth":"1995-01-17"},{"match":0.9999997178839721,"name":"MITRA MELINDAH","placeOfBirth":"PASURUAN","dateOfBirth":"2001-05-21"},{"match":0.9999998106673651,"name":"LESLIE TRI SK NINGRUM","placeOfBirth":"TANGERANG","dateOfBirth":"2002-05-25"},{"match":0.9999645520499919,"name":"SUTIAH","placeOfBirth":"TANGERANG","dateOfBirth":"1996-12-22"}]}
    ```


# Related Project
https://github.com/alpancs/tebakgender
