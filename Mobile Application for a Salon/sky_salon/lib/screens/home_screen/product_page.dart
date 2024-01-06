import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/item_provider.dart';
import 'package:sky_salon/utils/url_constants.dart';
import 'package:sky_salon/widgets/common_button.dart';
import 'package:sky_salon/widgets/size_config.dart';

class ProductPage extends StatefulWidget {
  const ProductPage({
    super.key,
  });

  @override
  State<ProductPage> createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ItemProvider>(context, listen: false).loadItemsList(context);
    });
    super.initState();
  }

  ScrollController _scrollController = ScrollController();
  @override
  Widget build(BuildContext context) {
    var size = SizeConfig();
    return Scaffold(
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Consumer<ItemProvider>(
            builder: (context, itmProvider, child) {
              if (itmProvider.getisLoadingProductList) {
                return CupertinoActivityIndicator();
              }
              return Column(
                children: [
                  ListView.builder(
                    controller: _scrollController,
                    itemCount: itmProvider.getloadedItemList!.data!.length,
                    shrinkWrap: true,
                    itemBuilder: (context, index) {
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(15.0),
                          child: Row(
                            children: [
                              Image.network(
                                "$IMAGE_URL/${itmProvider.getloadedItemList!.data![index].image!}",
                                width: 70,
                              ),
                              SizedBox(
                                width: 10,
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    // color: Colors.red,/
                                    width: MediaQuery.of(context).size.width - 180,
                                    child: Text(
                                      itmProvider.getloadedItemList!.data![index].name!,
                                      style: TextStyle(fontWeight: FontWeight.bold),
                                      overflow: TextOverflow.clip,
                                    ),
                                  ),
                                  Text('LKR ${itmProvider.getloadedItemList!.data![index].price!}'),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  CommonButton(
                                    width: 100,
                                    size: size,
                                    btnTxt: 'Add To Cart',
                                    onTap: () {
                                      itmProvider.addToCart(itmProvider.getloadedItemList!.data![index]);
                                    },
                                  )
                                ],
                              ),
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
