import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/item_provider.dart';
import 'package:sky_salon/utils/url_constants.dart';
import 'package:sky_salon/widgets/common_button.dart';
import 'package:sky_salon/widgets/size_config.dart';

class CategoryServicesPage extends StatefulWidget {
  const CategoryServicesPage({
    super.key,
    required this.category,
  });

  final String category;

  @override
  State<CategoryServicesPage> createState() => _CategoryServicesPageState();
}

class _CategoryServicesPageState extends State<CategoryServicesPage> {
  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ItemProvider>(context, listen: false)
          .loadServiceList(context, widget.category);
    });
    super.initState();
  }

  ScrollController _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    var size = SizeConfig();
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.category),
      ),
      body: Container(
        // controller: _scrollController,

        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Consumer<ItemProvider>(
            builder: (context, itmProvider, child) {
              if (itmProvider.getisLoadingServiceList) {
                return CupertinoActivityIndicator();
              }
              if (itmProvider.getloadedServiceListModel!.data!.isEmpty) {
                return Text('No Services in Category');
              }
              return Column(
                children: [
                  Expanded(
                    child: ListView.builder(
                      controller: _scrollController,
                      itemCount:
                          itmProvider.getloadedServiceListModel!.data!.length,
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        return Card(
                          child: Padding(
                            padding: const EdgeInsets.all(15.0),
                            child: Row(
                              children: [
                                Image.network(
                                  "$IMAGE_URL/${itmProvider.getloadedServiceListModel!.data![index].image!}",
                                  width: 70,
                                ),
                                SizedBox(
                                  width: 10,
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      itmProvider.getloadedServiceListModel!
                                          .data![index].title!,
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                    SizedBox(
                                      width: MediaQuery.of(context).size.width *
                                          .6,
                                      child: Text(
                                        itmProvider.getloadedServiceListModel!
                                            .data![index].description!,
                                        style: TextStyle(),
                                        overflow: TextOverflow.clip,
                                      ),
                                    ),
                                    Text(
                                        'LKR ${itmProvider.getloadedServiceListModel!.data![index].price!}'),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
