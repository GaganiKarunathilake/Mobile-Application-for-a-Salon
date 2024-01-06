import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/models/banner_list_model.dart';
import 'package:sky_salon/models/base_response_model.dart';
import 'package:sky_salon/models/item_list_model.dart';
import 'package:sky_salon/models/service_list_model.dart';
import 'package:sky_salon/provider/auth_provider.dart';
import 'dart:developer' as dev;

import 'package:sky_salon/utils/custom_http.dart';
import 'package:sky_salon/utils/url_constants.dart';
import 'package:sky_salon/widgets/error_messages.dart';

class ItemProvider extends ChangeNotifier {
  bool isLoadingProductList = false;
  bool get getisLoadingProductList => isLoadingProductList;
  setisLoadingProductList(val) {
    isLoadingProductList = val;
    notifyListeners();
  }

  ItemListModel? loadedItemList;
  ItemListModel? get getloadedItemList => loadedItemList;
  setloadedItemList(val) {
    loadedItemList = val;
    notifyListeners();
  }

  List<SingleItemData> cartItems = [];
  List<SingleItemData> get getcartItems => cartItems;

  addToCart(SingleItemData itm) {
    cartItems.add(itm);
    notifyListeners();
  }

  removeFromCart(SingleItemData itm) {
    cartItems.remove(itm);
    notifyListeners();
  }

  clearCart() {
    cartItems = [];
    notifyListeners();
  }

  Future<void> loadItemsList(context) async {
    setisLoadingProductList(true);

    try {
      setloadedItemList(null);

      final response = await CustomHttp.getDio().get(
        kGetProductList,
      );

      dev.log(response.data.toString());

      var encoded = jsonEncode(response.data);

      ItemListModel temp = ItemListModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        setloadedItemList(temp);
      } else {
        errorMessage(context, errorTxt: 'Error Loading').show();
      }
    } catch (e) {
      dev.log(e.toString());
    } finally {
      setisLoadingProductList(false);
    }
  }

  bool isPlacingOrder = false;
  bool get getisPlacingOrder => isPlacingOrder;
  setisPlacingOrder(val) {
    isPlacingOrder = val;
    notifyListeners();
  }

  Future<void> createOrder(context) async {
    setisPlacingOrder(true);

    try {
      // setloadedItemList(null);
      var auth = Provider.of<AuthProvider>(context, listen: false);
      var total = 0.0;

      for (var i = 0; i < getcartItems.length; i++) {
        total = total + double.parse(getcartItems[i].price!);
      }

      final response = await CustomHttp.getDio().post(
        kCreateOrder,
        data: {
          "customer_id": auth.getloggedinuser!.data!.sId,
          "customer_name": auth.getloggedinuser!.data!.name,
          "total": total,
          "items": [
            for (var i = 0; i < getcartItems.length; i++)
              {
                "item_id": getcartItems[i].sId,
                "name": getcartItems[i].name,
                "price": getcartItems[i].price,
              },
          ]
        },
      );

      dev.log(response.data.toString());

      var encoded = jsonEncode(response.data);

      BaseResponseModel temp = BaseResponseModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        clearCart();
        errorMessage(context, errorTxt: 'Success', btnType: 3).show();
      } else {
        errorMessage(context, errorTxt: 'Error').show();
      }
    } catch (e) {
      dev.log(e.toString());
    } finally {
      setisPlacingOrder(false);
    }
  }

  bool isLoadingBanners = false;
  bool get getisLoadingBanners => isLoadingBanners;
  setisLoadingBanners(val) {
    isLoadingBanners = val;
    notifyListeners();
  }

  BannerListModel? loadedBanners;
  BannerListModel? get getloadedBanners => loadedBanners;
  setloadedBanners(val) {
    loadedBanners = val;
    notifyListeners();
  }

  Future<void> loadBanners(context) async {
    setisLoadingBanners(true);

    try {
      setloadedBanners(null);

      final response = await CustomHttp.getDio().get(
        kgetbannerlist,
      );

      dev.log(response.data.toString());

      var encoded = jsonEncode(response.data);

      BannerListModel temp = BannerListModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        setloadedBanners(temp);
      } else {
        errorMessage(context, errorTxt: 'Error Loading').show();
      }
    } catch (e) {
      dev.log(e.toString());
    } finally {
      setisLoadingBanners(false);
    }
  }

  bool isLoadingServiceList = false;
  bool get getisLoadingServiceList => isLoadingServiceList;
  setisLoadingServiceList(val) {
    isLoadingServiceList = val;
    notifyListeners();
  }

  ServiceListModel? loadedServiceListModel;
  ServiceListModel? get getloadedServiceListModel => loadedServiceListModel;
  setloadedServiceListModel(val) {
    loadedServiceListModel = val;
    notifyListeners();
  }

  Future<void> loadServiceList(context, category) async {
    setisLoadingServiceList(true);

    try {
      setloadedServiceListModel(null);

      final response = await CustomHttp.getDio()
          .post(kGetServiceList, data: {"category": category});

      dev.log(response.data.toString());

      var encoded = jsonEncode(response.data);

      ServiceListModel temp = ServiceListModel.fromJson(jsonDecode(encoded));

      if (temp.error == false) {
        setloadedServiceListModel(temp);
      } else {
        errorMessage(context, errorTxt: 'Error Loading').show();
      }
    } catch (e) {
      dev.log(e.toString());
    } finally {
      setisLoadingServiceList(false);
    }
  }
}
