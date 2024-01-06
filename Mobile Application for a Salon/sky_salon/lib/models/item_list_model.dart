class ItemListModel {
  bool? error;
  List<SingleItemData>? data;

  ItemListModel({this.error, this.data});

  ItemListModel.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    if (json['data'] != null) {
      data = <SingleItemData>[];
      json['data'].forEach((v) {
        data!.add(new SingleItemData.fromJson(v));
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

class SingleItemData {
  bool? isDeleted;
  String? sId;
  String? name;
  String? price;
  String? quantity;
  String? image;
  int? created;
  int? iV;

  SingleItemData(
      {this.isDeleted,
      this.sId,
      this.name,
      this.price,
      this.quantity,
      this.image,
      this.created,
      this.iV});

  SingleItemData.fromJson(Map<String, dynamic> json) {
    isDeleted = json['is_deleted'];
    sId = json['_id'];
    name = json['name'];
    price = json['price'];
    quantity = json['quantity'];
    image = json['image'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['is_deleted'] = this.isDeleted;
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['price'] = this.price;
    data['quantity'] = this.quantity;
    data['image'] = this.image;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}
