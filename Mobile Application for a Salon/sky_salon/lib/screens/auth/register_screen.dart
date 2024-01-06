import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/auth_provider.dart';
import 'package:sky_salon/widgets/color_constants.dart';
import 'package:sky_salon/widgets/common_button.dart';
import 'package:sky_salon/widgets/common_input_field.dart';
import 'package:sky_salon/widgets/size_config.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  @override
  Widget build(BuildContext context) {
    var size = SizeConfig();
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(
            Icons.arrow_back_ios,
            color: kTxtColor,
          ),
        ),
        // automaticallyImplyLeading: true,
        backgroundColor: kScaffoldBackgroundColor,
        elevation: 0,
        title: Text(
          'Register',
          style: TextStyle(color: kTxtColor),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 25),
        child: SingleChildScrollView(
          child: Consumer<AuthProvider>(
            builder: (context, auth, child) {
              return Column(
                // crossAxisAlignment: CrossAxisAlignment.center,
                // mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(
                    'assets/images/logo.jpeg',
                    width: MediaQuery.of(context).size.width / 5,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(100),
                  ),
                  CommonInputField(
                    size: size,
                    width: double.infinity,
                    placeholder: 'Your Name',
                    textEditingController: auth.getnameController,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(50),
                  ),
                  CommonInputField(
                    size: size,
                    width: double.infinity,
                    placeholder: 'Email',
                    textEditingController: auth.getemailController,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(50),
                  ),
                  CommonInputField(
                    size: size,
                    width: double.infinity,
                    placeholder: 'Adrees Line 1',
                    textEditingController: auth.getadl1Controller,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(50),
                  ),
                  CommonInputField(
                    size: size,
                    width: double.infinity,
                    placeholder: 'Address Line 2',
                    textEditingController: auth.getadl2Controller,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(50),
                  ),
                  CommonInputField(
                    size: size,
                    width: double.infinity,
                    placeholder: 'City',
                    textEditingController: auth.getcityController,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(50),
                  ),
                  CommonInputField(
                    size: size,
                    width: double.infinity,
                    placeholder: 'Password',
                    textEditingController: auth.getpasswordController,
                    obscureText: true,
                  ),
                  SizedBox(
                    height: size.getPropotionateHeight(50),
                  ),
                  if (auth.getisRegisterLoading) CupertinoActivityIndicator(),
                  if (!auth.getisRegisterLoading)
                    CommonButton(
                      size: size,
                      width: MediaQuery.of(context).size.width / 2,
                      btnTxt: 'Register',
                      onTap: () {
                        auth.createUser(context);
                      },
                    ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
