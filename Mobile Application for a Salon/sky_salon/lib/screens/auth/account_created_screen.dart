import 'package:flutter/material.dart';
import 'package:sky_salon/screens/home_screen/home_scren.dart';
import 'package:sky_salon/widgets/common_button.dart';

import 'package:sky_salon/widgets/size_config.dart';

class AccountCreatedScreen extends StatefulWidget {
  const AccountCreatedScreen({super.key});

  @override
  State<AccountCreatedScreen> createState() => _AccountCreatedScreenState();
}

class _AccountCreatedScreenState extends State<AccountCreatedScreen> {
  @override
  Widget build(BuildContext context) {
    var size = SizeConfig();
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(25.0),
        child: SizedBox(
          width: double.infinity,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/images/logo.jpeg',
                width: MediaQuery.of(context).size.width / 2,
              ),
              SizedBox(
                height: size.getPropotionateHeight(100),
              ),
              Text(
                'Account Created',
                style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: size.getTextSize(25)),
              ),
              SizedBox(
                height: size.getPropotionateHeight(100),
              ),
              CommonButton(
                size: size,
                btnTxt: 'Get Started',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute<void>(
                      builder: (BuildContext context) => const HomeScreen(),
                    ),
                  );
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
