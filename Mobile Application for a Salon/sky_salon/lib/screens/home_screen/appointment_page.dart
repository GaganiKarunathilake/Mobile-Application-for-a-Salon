import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/appointment_provider.dart';
import 'package:sky_salon/screens/home_screen/new_appointment_page.dart';
import 'package:sky_salon/widgets/color_constants.dart';

class AppointmentPage extends StatefulWidget {
  const AppointmentPage({
    super.key,
  });

  @override
  State<AppointmentPage> createState() => _AppointmentPageState();
}

class _AppointmentPageState extends State<AppointmentPage> {
  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<AppointmentProvider>(context, listen: false).loadMyAppointments(context);
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: ElevatedButton(
        style: ElevatedButton.styleFrom(backgroundColor: kBtnPrimaryColor),
        onPressed: () {
          Navigator.push(
              context,
              MaterialPageRoute<void>(
                builder: (BuildContext context) => const NewAppointmentPage(),
              ));
        },
        child: Text('New'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Consumer<AppointmentProvider>(
            builder: (context, appr, child) {
              if (appr.isLoadingMyAppointments) {
                return CupertinoActivityIndicator();
              }
              if (appr.getloadedCustomerAppointentList == null) {
                return CupertinoActivityIndicator();
              }
              if (appr.getloadedCustomerAppointentList!.data!.isEmpty) {
                return Text("You don't have any appointments");
              }
              return Column(
                children: [
                  ListView.builder(
                    itemCount: appr.getloadedCustomerAppointentList!.data!.length,
                    shrinkWrap: true,
                    itemBuilder: (context, index) {
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(15.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                appr.getloadedCustomerAppointentList!.data![index].appointmentId!.specialistName!,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                ),
                              ),
                              Divider(),
                              Text("Date : " + appr.getloadedCustomerAppointentList!.data![index].appointmentId!.date!),
                              Text("Time : " + appr.getloadedCustomerAppointentList!.data![index].slotId!.time!),
                            ],
                          ),
                        ),
                      );
                    },
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
