class AuthUserModel {
  bool? error;
  Data? data;
  String? loginstatus;
  String? token;

  AuthUserModel({this.error, this.data, this.loginstatus, this.token});

  AuthUserModel.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    data = json['data'] != null ? new Data.fromJson(json['data']) : null;
    loginstatus = json['loginstatus'];
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['error'] = this.error;
    if (this.data != null) {
      data['data'] = this.data!.toJson();
    }
    data['loginstatus'] = this.loginstatus;
    data['token'] = this.token;
    return data;
  }
}

class Data {
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

  Data(
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

  Data.fromJson(Map<String, dynamic> json) {
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
