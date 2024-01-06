import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/appointment_provider.dart';
import 'package:sky_salon/provider/auth_provider.dart';
import 'package:sky_salon/provider/item_provider.dart';
import 'package:sky_salon/provider/navigation_provider.dart';
import 'package:sky_salon/screens/splash/splash_screen.dart';
import 'package:sky_salon/utils/context_helper.dart';
import 'package:sky_salon/widgets/color_constants.dart';
import 'package:sky_salon/widgets/size_config.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => NavigationProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => AppointmentProvider()),
        ChangeNotifierProvider(create: (_) => ItemProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        SizeConfig().init(constraints);
        return MaterialApp(
          title: 'Flutter Demo',
          debugShowCheckedModeBanner: false,
          navigatorKey: ContextHelper.navigatorKey,
          theme: ThemeData(
            primaryColor: Color(0XFFEB51D2),
            colorScheme: ColorScheme.fromSeed(seedColor: kScaffoldBackgroundColor),
            scaffoldBackgroundColor: kScaffoldBackgroundColor,
            useMaterial3: false,
            // textTheme: GoogleFonts.interTextTheme(),
          ),
          home: const SplashScreen(),
        );
      },
    );
  }
}
