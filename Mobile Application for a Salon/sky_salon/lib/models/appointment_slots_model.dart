class AppointmentSlotsModel {
  bool? error;
  List<SingleAppointmentSlot>? data;

  AppointmentSlotsModel({this.error, this.data});

  AppointmentSlotsModel.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    if (json['data'] != null) {
      data = <SingleAppointmentSlot>[];
      json['data'].forEach((v) {
        data!.add(new SingleAppointmentSlot.fromJson(v));
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

class SingleAppointmentSlot {
  bool? reserved;
  String? sId;
  String? appointmentId;
  String? time;
  int? created;
  int? iV;

  SingleAppointmentSlot(
      {this.reserved,
      this.sId,
      this.appointmentId,
      this.time,
      this.created,
      this.iV});

  SingleAppointmentSlot.fromJson(Map<String, dynamic> json) {
    reserved = json['reserved'];
    sId = json['_id'];
    appointmentId = json['appointment_id'];
    time = json['time'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['reserved'] = this.reserved;
    data['_id'] = this.sId;
    data['appointment_id'] = this.appointmentId;
    data['time'] = this.time;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}
