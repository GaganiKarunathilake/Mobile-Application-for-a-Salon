class AppointmentDateModel {
  bool? error;
  List<SingleAppointmentData>? data;

  AppointmentDateModel({this.error, this.data});

  AppointmentDateModel.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    if (json['data'] != null) {
      data = <SingleAppointmentData>[];
      json['data'].forEach((v) {
        data!.add(new SingleAppointmentData.fromJson(v));
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

class SingleAppointmentData {
  String? sId;
  String? specialistName;
  String? date;
  int? created;
  int? iV;

  SingleAppointmentData(
      {this.sId, this.specialistName, this.date, this.created, this.iV});

  SingleAppointmentData.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    specialistName = json['specialist_name'];
    date = json['date'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['specialist_name'] = this.specialistName;
    data['date'] = this.date;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}
