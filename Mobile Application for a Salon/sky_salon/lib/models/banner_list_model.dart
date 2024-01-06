class BannerListModel {
  bool? error;
  List<SingleBannerData>? data;

  BannerListModel({this.error, this.data});

  BannerListModel.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    if (json['data'] != null) {
      data = <SingleBannerData>[];
      json['data'].forEach((v) {
        data!.add(new SingleBannerData.fromJson(v));
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

class SingleBannerData {
  String? sId;
  String? image;
  int? created;
  int? iV;

  SingleBannerData({this.sId, this.image, this.created, this.iV});

  SingleBannerData.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    image = json['image'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['image'] = this.image;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}
