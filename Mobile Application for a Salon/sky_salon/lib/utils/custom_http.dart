import 'dart:io';
import 'package:dio/dio.dart';

class CustomHttp {
  static final Dio _dio = Dio();

  static Dio getDio() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          // log(options.data.toString());
          // log(options.headers.toString());
          options.headers[HttpHeaders.contentTypeHeader] = "application/json";
          // options.headers['deviceId'] = await AuthProvider().getDeviceId();
          // options.headers['Authorization'] =
          //     "Bearer ${await AuthProvider().getSignedInUserToken()}";
          return handler.next(options);
        },
        onResponse: (response, handler) async {
          // Do something with response data
          return handler.next(response);
        },
        onError: (DioError e, handler) async {
          return handler.resolve(e.response!);
        },
      ),
    );
    return _dio;
  }
}
