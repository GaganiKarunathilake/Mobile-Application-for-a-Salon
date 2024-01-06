import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:sky_salon/models/auth_user_model.dart';
import 'package:sky_salon/screens/auth/account_created_screen.dart';
import 'package:sky_salon/screens/home_screen/home_scren.dart';
// import 'package:sky_salon/screens/home_screen/home_scren.dart';
import 'package:sky_salon/utils/custom_http.dart';
import 'package:sky_salon/utils/url_constants.dart';
import 'package:sky_salon/widgets/error_messages.dart';
import 'dart:developer' as dev;

class AuthProvider extends ChangeNotifier {
  TextEditingController nameController = TextEditingController();
  TextEditingController get getnameController => nameController;

  TextEditingController emailController = TextEditingController();
  TextEditingController get getemailController => emailController;

  TextEditingController adl1Controller = TextEditingController();
  TextEditingController get getadl1Controller => adl1Controller;

  TextEditingController adl2Controller = TextEditingController();
  TextEditingController get getadl2Controller => adl2Controller;

  TextEditingController cityController = TextEditingController();
  TextEditingController get getcityController => cityController;

  TextEditingController passwordController = TextEditingController();
  TextEditingController get getpasswordController => passwordController;

  bool isRegisterLoading = false;
  bool get getisRegisterLoading => isRegisterLoading;
  setisRegisterLoading(val) {
    isRegisterLoading = val;
    notifyListeners();
  }

  AuthUserModel? loggedinuser;
  AuthUserModel? get getloggedinuser => loggedinuser;
  setloggedinuser(val) {
    loggedinuser = val;
    notifyListeners();
  }

  setControllerValues() {
    nameController.text = getloggedinuser!.data!.name!;
    emailController.text = getloggedinuser!.data!.email!;
    adl1Controller.text = getloggedinuser!.data!.adl1 ?? '';
    adl2Controller.text = getloggedinuser!.data!.adl2 ?? '';
    cityController.text = getloggedinuser!.data!.city!;
    notifyListeners();
  }

  Future<void> createUser(context) async {
    setisRegisterLoading(true);

    try {
      final response = await CustomHttp.getDio().post(
        kRegisterUrl,
        data: {
          "name": nameController.text,
          "email": emailController.text,
          "addressline1": adl1Controller.text,
          'addressline2': adl2Controller.text,
          "city": cityController.text,
          "password": passwordController.text,
        },
      );

      var encoded = jsonEncode(response.data);

      dev.log(response.data.toString());

      AuthUserModel temp = AuthUserModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        setloggedinuser(temp);
        setControllerValues();
        Navigator.pushAndRemoveUntil<void>(
            context,
            MaterialPageRoute<void>(
              builder: (BuildContext context) => const AccountCreatedScreen(),
            ),
            (route) => false);
      } else {
        errorMessage(context, errorTxt: 'Check data again').show();
      }
    } catch (e) {
      dev.log(e.toString());
      errorMessage(context, errorTxt: 'Server Connection Error').show();
    } finally {
      setisRegisterLoading(false);
    }
  }

  Future<void> loginUser(context) async {
    setisRegisterLoading(true);

    try {
      final response = await CustomHttp.getDio().post(
        kLoginUrl,
        data: {
          "email": emailController.text,
          "password": passwordController.text,
        },
      );

      var encoded = jsonEncode(response.data);

      AuthUserModel temp = AuthUserModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        setloggedinuser(temp);
        setControllerValues();

        Navigator.pushAndRemoveUntil<void>(
            context,
            MaterialPageRoute<void>(
              builder: (BuildContext context) => const HomeScreen(),
            ),
            (route) => false);
      } else {
        errorMessage(context, errorTxt: 'Check data again').show();
      }
    } catch (e) {
      dev.log(e.toString());
      errorMessage(context, errorTxt: 'Server Connection Error').show();
    } finally {
      setisRegisterLoading(false);
    }
  }

  Future<void> updateUser(context) async {
    setisRegisterLoading(true);

    try {
      final response = await CustomHttp.getDio().post(
        kUpdateUser,
        data: {
          "user_id": getloggedinuser!.data!.sId,
          "name": nameController.text,
          "email": emailController.text,
          "addressline1": adl1Controller.text,
          'addressline2': adl2Controller.text,
          "city": cityController.text,
        },
      );

      var encoded = jsonEncode(response.data);

      dev.log(response.data.toString());

      AuthUserModel temp = AuthUserModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        errorMessage(context, btnType: 3, errorTxt: 'Success').show();
      } else {
        errorMessage(context, errorTxt: 'Check data again').show();
      }
    } catch (e) {
      dev.log(e.toString());
      errorMessage(context, errorTxt: 'Server Connection Error').show();
    } finally {
      setisRegisterLoading(false);
    }
  }
}
