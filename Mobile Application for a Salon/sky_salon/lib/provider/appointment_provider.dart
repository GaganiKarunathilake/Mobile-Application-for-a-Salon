import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/models/appointment_slots_model.dart';
import 'package:sky_salon/models/appointmentdate_model.dart';
import 'package:sky_salon/models/base_response_model.dart';
import 'package:sky_salon/models/customer_appointment_model.dart';
import 'package:sky_salon/provider/auth_provider.dart';
import 'package:sky_salon/utils/context_helper.dart';
import 'package:sky_salon/utils/custom_http.dart';
import 'package:sky_salon/utils/url_constants.dart';
import 'package:sky_salon/widgets/error_messages.dart';
import 'dart:developer' as dev;

class AppointmentProvider extends ChangeNotifier {
  bool isLoadingAppointmentDates = false;
  bool get getisLoadingAppointmentDates => isLoadingAppointmentDates;
  setisLoadingAppointmentDates(val) {
    isLoadingAppointmentDates = val;
    notifyListeners();
  }

  AppointmentDateModel? loadedAppDateList;
  AppointmentDateModel? get getloadedAppDateList => loadedAppDateList;
  setloadedAppDateList(val) {
    loadedAppDateList = val;
    notifyListeners();
  }

  Future<void> getAppointmentSpecialistandDate(context) async {
    setisLoadingAppointmentDates(true);
    try {
      setloadedAppDateList(null);
      setselectedSingleSpecialist(null);
      setselectedAppointment(null);
      setloadedAppointmentSlots(null);
      final response = await CustomHttp.getDio().get(kGetAppointmentDateList);

      // dev.log(response.data.toString());

      var encoded = jsonEncode(response.data);

      AppointmentDateModel temp =
          AppointmentDateModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        setloadedAppDateList(temp);
      } else {
        errorMessage(context, errorTxt: 'Error Loading Items').show();
      }
    } catch (e) {
      dev.log(e.toString());
    } finally {
      setisLoadingAppointmentDates(false);
    }
  }

  TextEditingController dropearchCOnteoller = TextEditingController();
  TextEditingController get dropsearchCOnteoller => dropearchCOnteoller;

  SingleAppointmentData? selectedSingleSpecialist;
  SingleAppointmentData? get getselectedSingleSpecialis =>
      selectedSingleSpecialist;
  setselectedSingleSpecialist(val) {
    selectedSingleSpecialist = val;
    notifyListeners();
  }

  List<DropdownMenuItem<dynamic>>? get getSpecialistListDrop {
    List<DropdownMenuItem<dynamic>>? temp = [];
    for (var i = 0; i < getloadedAppDateList!.data!.length; i++) {
      if (temp.contains(DropdownMenuItem(
        value: getloadedAppDateList!.data![i],
        child: Text(
          "${getloadedAppDateList!.data![i].specialistName}",
          style: const TextStyle(
            fontSize: 14,
          ),
        ),
      ))) {
      } else {
        temp.add(
          DropdownMenuItem(
            value: getloadedAppDateList!.data![i],
            child: Text(
              "${getloadedAppDateList!.data![i].specialistName}",
              style: const TextStyle(
                fontSize: 14,
              ),
            ),
          ),
        );
      }
    }

    return temp;
  }

  SingleAppointmentData? selectedAppointment;
  SingleAppointmentData? get getselectedAppointment => selectedAppointment;
  setselectedAppointment(val) {
    selectedAppointment = val;
    notifyListeners();
  }

  List<DropdownMenuItem<dynamic>>? get getSpecialistDateListDrop {
    List<DropdownMenuItem<dynamic>>? temp = [];
    if (getselectedSingleSpecialis != null) {
      for (var i = 0; i < getloadedAppDateList!.data!.length; i++) {
        if (temp.contains(DropdownMenuItem(
          value: getloadedAppDateList!.data![i],
          child: Text(
            "${getloadedAppDateList!.data![i].specialistName}",
            style: const TextStyle(
              fontSize: 14,
            ),
          ),
        ))) {
        } else {
          if (getloadedAppDateList!.data![i].specialistName ==
              getselectedSingleSpecialis!.specialistName) {
            temp.add(
              DropdownMenuItem(
                value: getloadedAppDateList!.data![i],
                child: Text(
                  "${getloadedAppDateList!.data![i].date}",
                  style: const TextStyle(
                    fontSize: 14,
                  ),
                ),
              ),
            );
          }
        }
      }
    }

    return temp;
  }

  List<SingleAppointmentData> getLoadedSpecialistList() {
    List<SingleAppointmentData> tmp = [];
    if (getloadedAppDateList != null) {
      for (var i = 0; i < getloadedAppDateList!.data!.length; i++) {
        if (!(tmp.any((element) =>
            element.specialistName ==
            getloadedAppDateList!.data![i].specialistName))) {
          tmp.add(getloadedAppDateList!.data![i]);
        }
      }
    }
    return tmp;
  }

  AppointmentSlotsModel? loadedAppointmentSlots;
  AppointmentSlotsModel? get getloadedAppointmentSlots =>
      loadedAppointmentSlots;
  setloadedAppointmentSlots(val) {
    loadedAppointmentSlots = val;
    notifyListeners();
  }

  bool isLoadingSlots = false;
  bool get getisLoadingSlots => isLoadingSlots;
  setisLoadingSlots(val) {
    isLoadingSlots = val;
    notifyListeners();
  }

  Future<void> getAppointmentSlots(context) async {
    setisLoadingSlots(true);

    try {
      setloadedAppointmentSlots(null);
      final response = await CustomHttp.getDio().post(kGetAppointmentSlots,
          data: {"appointment_id": getselectedAppointment!.sId});

      // dev.log(response.data.toString());

      var encoded = jsonEncode(response.data);

      AppointmentSlotsModel temp =
          AppointmentSlotsModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        setloadedAppointmentSlots(temp);
      } else {
        errorMessage(context, errorTxt: 'Error Loading Slots').show();
      }
    } catch (e) {
      dev.log(e.toString());
    } finally {
      setisLoadingSlots(false);
    }
  }

  Future<void> bookAppointment(context, slotid) async {
    setisLoadingMyAppointments(true);
    try {
      setloadedAppointmentSlots(null);
      Navigator.pop(ContextHelper.navigatorKey.currentContext!);
      Navigator.pop(ContextHelper.navigatorKey.currentContext!);
      var prv = Provider.of<AuthProvider>(
          ContextHelper.navigatorKey.currentContext!,
          listen: false);
      final response = await CustomHttp.getDio().post(
        kCustomerReserveAppointment,
        data: {
          "appointment_id": getselectedAppointment!.sId,
          "slot_id": slotid,
          "user_id": prv.getloggedinuser!.data!.sId
        },
      );

      dev.log(response.data.toString());

      var encoded = jsonEncode(response.data);

      BaseResponseModel temp = BaseResponseModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        await loadMyAppointments(ContextHelper.navigatorKey.currentContext!);
      } else {
        errorMessage(context, errorTxt: 'Error Saving').show();
      }
    } catch (e) {
      dev.log(e.toString());
    } finally {
      setisLoadingMyAppointments(false);
    }
  }

  bool isLoadingMyAppointments = false;
  bool get getisLoadingMyAppointments => isLoadingMyAppointments;
  setisLoadingMyAppointments(val) {
    isLoadingMyAppointments = val;
    notifyListeners();
  }

  CustomerAppointmentListModel? loadedCustomerAppointentList;
  CustomerAppointmentListModel? get getloadedCustomerAppointentList =>
      loadedCustomerAppointentList;
  setloadedCustomerAppointentList(val) {
    loadedCustomerAppointentList = val;
    notifyListeners();
  }

  Future<void> loadMyAppointments(context) async {
    setisLoadingMyAppointments(true);

    try {
      setloadedCustomerAppointentList(null);

      var prv = Provider.of<AuthProvider>(context, listen: false);
      final response = await CustomHttp.getDio().post(
        kGetCustomerAppointments,
        data: {"user_id": prv.getloggedinuser!.data!.sId},
      );

      dev.log(response.data.toString());

      var encoded = jsonEncode(response.data);

      CustomerAppointmentListModel temp =
          CustomerAppointmentListModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        setloadedCustomerAppointentList(temp);
      } else {
        errorMessage(context, errorTxt: 'Error Saving').show();
      }
    } catch (e) {
      dev.log(e.toString());
    } finally {
      setisLoadingMyAppointments(false);
    }
  }
}
