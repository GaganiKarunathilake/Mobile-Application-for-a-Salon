import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/auth_provider.dart';
import 'package:sky_salon/screens/auth/register_screen.dart';
import 'package:sky_salon/widgets/common_button.dart';
import 'package:sky_salon/widgets/common_input_field.dart';
import 'package:sky_salon/widgets/size_config.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    var size = SizeConfig();
    return Scaffold(
      body: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.all(25.0),
        child: SingleChildScrollView(
          child: Consumer<AuthProvider>(
            builder: (context, authP, child) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    height: size.getPropotionateHeight(100),
                  ),
                  Image.asset(
                    'assets/images/logo.jpeg',
                    width: MediaQuery.of(context).size.width / 2,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(100),
                  ),
                  CommonInputField(
                    size: size,
                    width: double.infinity,
                    placeholder: 'Email',
                    textEditingController: authP.getemailController,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(50),
                  ),
                  CommonInputField(
                    size: size,
                    width: double.infinity,
                    placeholder: 'Password',
                    textEditingController: authP.getpasswordController,
                    obscureText: true,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(50),
                  ),
                  if (authP.getisRegisterLoading) CupertinoActivityIndicator(),
                  if (!authP.getisRegisterLoading)
                    CommonButton(
                      size: size,
                      width: MediaQuery.of(context).size.width / 2,
                      btnTxt: 'Login',
                      onTap: () {
                        authP.loginUser(context);
                      },
                    ),
                  SizedBox(
                    height: size.getPropotionateHeight(20),
                  ),
                  Text("Doesn't have an account?"),
                  SizedBox(
                    height: size.getPropotionateHeight(10),
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute<void>(
                          builder: (BuildContext context) =>
                              const RegisterScreen(),
                        ),
                      );
                    },
                    child: Text(
                      "Register",
                      style: TextStyle(decoration: TextDecoration.underline),
                    ),
                  )
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
