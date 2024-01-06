class ServiceListModel {
  bool? error;
  List<SingleServiceData>? data;

  ServiceListModel({this.error, this.data});

  ServiceListModel.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    if (json['data'] != null) {
      data = <SingleServiceData>[];
      json['data'].forEach((v) {
        data!.add(new SingleServiceData.fromJson(v));
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

class SingleServiceData {
  String? sId;
  String? category;
  String? image;
  String? title;
  String? description;
  String? price;
  int? created;
  int? iV;

  SingleServiceData(
      {this.sId,
      this.category,
      this.image,
      this.title,
      this.description,
      this.price,
      this.created,
      this.iV});

  SingleServiceData.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    category = json['category'];
    image = json['image'];
    title = json['title'];
    description = json['description'];
    price = json['price'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['category'] = this.category;
    data['image'] = this.image;
    data['title'] = this.title;
    data['description'] = this.description;
    data['price'] = this.price;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}
