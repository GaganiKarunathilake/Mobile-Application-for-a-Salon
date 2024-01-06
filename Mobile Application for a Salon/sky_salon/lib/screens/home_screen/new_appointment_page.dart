import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:rflutter_alert/rflutter_alert.dart';
import 'package:sky_salon/provider/appointment_provider.dart';
import 'package:sky_salon/widgets/color_constants.dart';
import 'package:sky_salon/widgets/common_button.dart';
import 'package:sky_salon/widgets/common_searchabledrop2.dart';
import 'package:sky_salon/widgets/size_config.dart';

class NewAppointmentPage extends StatefulWidget {
  const NewAppointmentPage({super.key});

  @override
  State<NewAppointmentPage> createState() => _NewAppointmentPageState();
}

class _NewAppointmentPageState extends State<NewAppointmentPage> {
  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<AppointmentProvider>(context, listen: false)
          .getAppointmentSpecialistandDate(context);
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = SizeConfig();
    return Scaffold(
      appBar: AppBar(
        title: Text('New Appointment'),
      ),
      body: SingleChildScrollView(
        child: Consumer<AppointmentProvider>(
          builder: (context, appointmentProvider, child) {
            if (appointmentProvider.getisLoadingAppointmentDates) {
              return Container(
                width: double.infinity,
                height: MediaQuery.of(context).size.height - 100,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    CupertinoActivityIndicator(),
                  ],
                ),
              );
            }
            return Padding(
              padding: const EdgeInsets.all(15.0),
              child: Column(
                children: [
                  CommonSeachableDrop2(
                    items: appointmentProvider.getSpecialistListDrop,
                    value: appointmentProvider.getselectedSingleSpecialis,
                    onChanged: (p0) {
                      appointmentProvider.setselectedAppointment(null);
                      appointmentProvider.setloadedAppointmentSlots(null);
                      appointmentProvider.setselectedSingleSpecialist(p0);
                    },
                    searchController: appointmentProvider.dropsearchCOnteoller,
                    controller: appointmentProvider.dropsearchCOnteoller,
                    searchMatchFn: (p0, p1) {
                      // print(p0.toString());
                      // return true;
                      return ("${p0.value.specialistName ?? ''}"
                          .toLowerCase()
                          .contains(p1.toLowerCase()));
                    },
                    hint: 'Select Specialist',
                  ),
                  SizedBox(
                    height: 25,
                  ),
                  CommonSeachableDrop2(
                    items: appointmentProvider.getSpecialistDateListDrop,
                    value: appointmentProvider.getselectedAppointment,
                    onChanged: (p0) {
                      appointmentProvider.setselectedAppointment(p0);
                      appointmentProvider.setloadedAppointmentSlots(null);
                      appointmentProvider.getAppointmentSlots(context);
                    },
                    searchController: appointmentProvider.dropsearchCOnteoller,
                    controller: appointmentProvider.dropsearchCOnteoller,
                    searchMatchFn: (p0, p1) {
                      // print(p0.toString());
                      // return true;
                      return ("${p0.value.date ?? ''}"
                          .toLowerCase()
                          .contains(p1.toLowerCase()));
                    },
                    hint: 'Select Date',
                  ),
                  SizedBox(
                    height: 25,
                  ),
                  if (appointmentProvider.getisLoadingSlots)
                    CupertinoActivityIndicator(),
                  if (appointmentProvider.getloadedAppointmentSlots != null &&
                      !appointmentProvider.getisLoadingSlots) ...[
                    if (appointmentProvider
                        .getloadedAppointmentSlots!.data!.isEmpty)
                      Text('No Slots Available'),
                    if (appointmentProvider
                        .getloadedAppointmentSlots!.data!.isNotEmpty) ...[
                      for (int i = 0;
                          i <
                              appointmentProvider
                                  .getloadedAppointmentSlots!.data!.length;
                          i++)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 20),
                          child: Card(
                            color: kLightGrey2,
                            child: Column(
                              children: [
                                Padding(
                                  padding: EdgeInsets.all(14),
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        appointmentProvider
                                                .getloadedAppointmentSlots!
                                                .data![i]
                                                .time ??
                                            '',
                                        style: TextStyle(
                                          fontWeight: FontWeight.w600,
                                          fontSize: 18,
                                        ),
                                      ),
                                      appointmentProvider
                                              .getloadedAppointmentSlots!
                                              .data![i]
                                              .reserved!
                                          ? Container()
                                          : CommonButton(
                                              size: size,
                                              btnTxt: 'Book',
                                              onTap: () {
                                                Alert(
                                                  context: context,
                                                  title: 'Are you sure?',
                                                  buttons: [
                                                    DialogButton(
                                                      color: kBtnPrimaryColor,
                                                      child: Text('YES'),
                                                      onPressed: () {
                                                        appointmentProvider
                                                            .bookAppointment(
                                                                context,
                                                                appointmentProvider
                                                                    .getloadedAppointmentSlots!
                                                                    .data![i]
                                                                    .sId);
                                                      },
                                                    ),
                                                    DialogButton(
                                                      child: Text('No'),
                                                      onPressed: () {
                                                        Navigator.pop(context);
                                                      },
                                                    ),
                                                  ],
                                                ).show();
                                              },
                                            )
                                    ],
                                  ),
                                ),
                                Container(
                                  padding: EdgeInsets.all(5),
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                      color: appointmentProvider
                                              .getloadedAppointmentSlots!
                                              .data![i]
                                              .reserved!
                                          ? Colors.red
                                          : Colors.green,
                                      borderRadius: BorderRadius.only(
                                        bottomLeft: Radius.circular(5),
                                        bottomRight: Radius.circular(5),
                                      )),
                                  width: double.infinity,
                                  child: Text(appointmentProvider
                                          .getloadedAppointmentSlots!
                                          .data![i]
                                          .reserved!
                                      ? "Slot Not Available"
                                      : "Slot Available"),
                                )
                              ],
                            ),
                          ),
                        )
                    ]
                  ]
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
