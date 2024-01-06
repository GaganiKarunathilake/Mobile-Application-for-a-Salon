import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/auth_provider.dart';
import 'package:sky_salon/widgets/common_button.dart';
import 'package:sky_salon/widgets/common_input_field.dart';
import 'package:sky_salon/widgets/size_config.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({
    super.key,
    required this.size,
  });

  final SizeConfig size;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Consumer<AuthProvider>(
          builder: (context, auth, child) {
            return Column(
              children: [
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
                CommonButton(
                  size: size,
                  width: MediaQuery.of(context).size.width / 2,
                  btnTxt: 'Update',
                  onTap: () {
                    auth.updateUser(context);
                  },
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
