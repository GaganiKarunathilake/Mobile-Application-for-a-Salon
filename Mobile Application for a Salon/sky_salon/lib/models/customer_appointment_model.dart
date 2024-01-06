import 'package:sky_salon/models/appointment_slots_model.dart';
import 'package:sky_salon/models/appointmentdate_model.dart';

class CustomerAppointmentListModel {
  bool? error;
  List<SingleCustomerAppointment>? data;

  CustomerAppointmentListModel({this.error, this.data});

  CustomerAppointmentListModel.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    if (json['data'] != null) {
      data = <SingleCustomerAppointment>[];
      json['data'].forEach((v) {
        data!.add(new SingleCustomerAppointment.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['error'] = this.error;
    if (this.data != null) {
      data['data'] = this.data!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class SingleCustomerAppointment {
  String? sId;
  SingleAppointmentData? appointmentId;
  SingleAppointmentSlot? slotId;
  UserId? userId;
  int? created;
  int? iV;

  SingleCustomerAppointment(
      {this.sId,
      this.appointmentId,
      this.slotId,
      this.userId,
      this.created,
      this.iV});

  SingleCustomerAppointment.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    appointmentId = json['appointment_id'] != null
        ? new SingleAppointmentData.fromJson(json['appointment_id'])
        : null;
    slotId = json['slot_id'] != null
        ? new SingleAppointmentSlot.fromJson(json['slot_id'])
        : null;
    userId =
        json['user_id'] != null ? new UserId.fromJson(json['user_id']) : null;
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    if (this.appointmentId != null) {
      data['appointment_id'] = this.appointmentId!.toJson();
    }
    if (this.slotId != null) {
      data['slot_id'] = this.slotId!.toJson();
    }
    if (this.userId != null) {
      data['user_id'] = this.userId!.toJson();
    }
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}

// class AppointmentId {
//   String? sId;
//   String? specialistName;
//   String? date;
//   int? created;
//   int? iV;

//   AppointmentId(
//       {this.sId, this.specialistName, this.date, this.created, this.iV});

//   AppointmentId.fromJson(Map<String, dynamic> json) {
//     sId = json['_id'];
//     specialistName = json['specialist_name'];
//     date = json['date'];
//     created = json['created'];
//     iV = json['__v'];
//   }

//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['_id'] = this.sId;
//     data['specialist_name'] = this.specialistName;
//     data['date'] = this.date;
//     data['created'] = this.created;
//     data['__v'] = this.iV;
//     return data;
//   }
// }

// class SlotId {
//   bool? reserved;
//   String? sId;
//   String? appointmentId;
//   String? time;
//   int? created;
//   int? iV;

//   SlotId(
//       {this.reserved,
//       this.sId,
//       this.appointmentId,
//       this.time,
//       this.created,
//       this.iV});

//   SlotId.fromJson(Map<String, dynamic> json) {
//     reserved = json['reserved'];
//     sId = json['_id'];
//     appointmentId = json['appointment_id'];
//     time = json['time'];
//     created = json['created'];
//     iV = json['__v'];
//   }

// Map<String, dynamic> toJson() {
//   final Map<String, dynamic> data = new Map<String, dynamic>();
//   data['reserved'] = this.reserved;
//   data['_id'] = this.sId;
//   data['appointment_id'] = this.appointmentId;
//   data['time'] = this.time;
//   data['created'] = this.created;
//   data['__v'] = this.iV;
//   return data;
// }
// }

class UserId {
  String? token;
  String? usertype;
  bool? isDeleted;
  String? sId;
  String? name;
  String? email;
  String? adl1;
  String? adl2;
  String? city;
  String? password;
  int? created;
  int? iV;

  UserId(
      {this.token,
      this.usertype,
      this.isDeleted,
      this.sId,
      this.name,
      this.email,
      this.adl1,
      this.adl2,
      this.city,
      this.password,
      this.created,
      this.iV});

  UserId.fromJson(Map<String, dynamic> json) {
    token = json['token'];
    usertype = json['usertype'];
    isDeleted = json['is_deleted'];
    sId = json['_id'];
    name = json['name'];
    email = json['email'];
    adl1 = json['adl1'];
    adl2 = json['adl2'];
    city = json['city'];
    password = json['password'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['token'] = this.token;
    data['usertype'] = this.usertype;
    data['is_deleted'] = this.isDeleted;
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['email'] = this.email;
    data['adl1'] = this.adl1;
    data['adl2'] = this.adl2;
    data['city'] = this.city;
    data['password'] = this.password;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}
