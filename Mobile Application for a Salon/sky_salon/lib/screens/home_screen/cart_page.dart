import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/item_provider.dart';
import 'package:sky_salon/utils/url_constants.dart';
import 'package:sky_salon/widgets/common_button.dart';
import 'package:sky_salon/widgets/size_config.dart';

class CartPage extends StatefulWidget {
  const CartPage({
    super.key,
  });

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  @override
  void initState() {
    super.initState();
  }

  ScrollController _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    var size = SizeConfig();
    return Scaffold(
      body: Container(
        // controller: _scrollController,
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Consumer<ItemProvider>(
            builder: (context, itmProvider, child) {
              if (itmProvider.getisLoadingProductList) {
                return CupertinoActivityIndicator();
              }
              if (itmProvider.getcartItems.isEmpty) {
                return Text('No Items in cart');
              }
              return Column(
                children: [
                  Expanded(
                    child: ListView.builder(
                      controller: _scrollController,
                      itemCount: itmProvider.getcartItems.length,
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        return Card(
                          child: Padding(
                            padding: const EdgeInsets.all(15.0),
                            child: Row(
                              children: [
                                Image.network(
                                  "$IMAGE_URL/${itmProvider.getcartItems[index].image!}",
                                  width: 70,
                                ),
                                SizedBox(
                                  width: 10,
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    SizedBox(
                                      width: MediaQuery.of(context).size.width - 180,
                                      child: Text(
                                        itmProvider.getcartItems[index].name!,
                                        style: TextStyle(fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    Text('LKR ${itmProvider.getcartItems[index].price!}'),
                                    SizedBox(
                                      height: 15,
                                    ),
                                    CommonButton(
                                      width: 100,
                                      size: size,
                                      btnTxt: 'Remove Item',
                                      onTap: () {
                                        itmProvider.removeFromCart(itmProvider.getcartItems[index]);
                                      },
                                    )
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  CommonButton(
                    size: size,
                    btnTxt: 'Place Order',
                    onTap: () {
                      itmProvider.createOrder(context);
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
