import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sky_salon/provider/item_provider.dart';
import 'package:sky_salon/provider/navigation_provider.dart';
import 'package:sky_salon/screens/home_screen/category_services.dart';
import 'package:sky_salon/utils/url_constants.dart';
import 'package:sky_salon/widgets/common_button.dart';
import 'package:sky_salon/widgets/size_config.dart';

class HomeTabPage extends StatefulWidget {
  const HomeTabPage({
    super.key,
    required this.size,
  });

  final SizeConfig size;

  @override
  State<HomeTabPage> createState() => _HomeTabPageState();
}

class _HomeTabPageState extends State<HomeTabPage> {
  int _current = 0;
  final CarouselController _controller = CarouselController();

  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ItemProvider>(context, listen: false).loadBanners(context);
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          children: [
            SizedBox(
              height: 20,
            ),
            Text(
              "What do you want to today?",
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: widget.size.getTextSize(25),
              ),
            ),
            SizedBox(
              height: 10,
            ),
            SizedBox(
              height: 120,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute<void>(
                            builder: (BuildContext context) =>
                                CategoryServicesPage(category: 'haircut'),
                          ),
                        );
                      },
                      child: Column(
                        children: [
                          Container(
                            width: 75,
                            height: 75,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                // color: kBtnGrey,
                                image: DecorationImage(
                                    image: AssetImage(
                                        'assets/images/haircut.png'))),
                          ),
                          Text(
                            "Haircut",
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: widget.size.getTextSize(25),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute<void>(
                            builder: (BuildContext context) =>
                                CategoryServicesPage(category: 'facial'),
                          ),
                        );
                      },
                      child: Column(
                        children: [
                          Container(
                            width: 75,
                            height: 75,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                // color: kBtnGrey,
                                image: DecorationImage(
                                    image: AssetImage(
                                        'assets/images/facial.png'))),
                          ),
                          Text(
                            "Facial",
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: widget.size.getTextSize(25),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute<void>(
                            builder: (BuildContext context) =>
                                CategoryServicesPage(category: 'makeup'),
                          ),
                        );
                      },
                      child: Column(
                        children: [
                          Container(
                            width: 75,
                            height: 75,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                // color: kBtnGrey,
                                image: DecorationImage(
                                    image: AssetImage(
                                        'assets/images/makeup.png'))),
                          ),
                          Text(
                            "Make Up",
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: widget.size.getTextSize(25),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute<void>(
                            builder: (BuildContext context) =>
                                CategoryServicesPage(category: 'bridal'),
                          ),
                        );
                      },
                      child: Column(
                        children: [
                          Container(
                            width: 75,
                            height: 75,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                // color: kBtnGrey,
                                image: DecorationImage(
                                    image: AssetImage(
                                        'assets/images/bridal.png'))),
                          ),
                          Text(
                            "Bridal",
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: widget.size.getTextSize(25),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            ),
            SizedBox(
              height: 30,
            ),
            Consumer<ItemProvider>(
              builder: (context, value, child) {
                if (value.isLoadingBanners) {
                  return CupertinoActivityIndicator();
                }
                return CarouselSlider(
                  items: [
                    for (int i = 0;
                        i < value.getloadedBanners!.data!.length;
                        i++)
                      Container(
                        child: Container(
                          margin: EdgeInsets.all(5.0),
                          child: ClipRRect(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5.0)),
                              child: Stack(
                                children: <Widget>[
                                  Image.network(
                                      "$IMAGE_URL/${value.getloadedBanners!.data![i].image!}",
                                      fit: BoxFit.cover,
                                      width: 1000.0),
                                ],
                              )),
                        ),
                      ),
                  ],
                  carouselController: _controller,
                  options: CarouselOptions(
                      autoPlay: true,
                      enlargeCenterPage: true,
                      aspectRatio: 2.0,
                      onPageChanged: (index, reason) {
                        setState(() {
                          _current = index;
                        });
                      }),
                );
              },
            ),
            Consumer<ItemProvider>(
              builder: (context, value, child) {
                if (value.isLoadingBanners) {
                  return Container();
                }
                return Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: value.getloadedBanners!.data!
                      .asMap()
                      .entries
                      .map((entry) {
                    return GestureDetector(
                      onTap: () => _controller.animateToPage(entry.key),
                      child: Container(
                        width: 12.0,
                        height: 12.0,
                        margin: EdgeInsets.symmetric(
                            vertical: 8.0, horizontal: 4.0),
                        decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color:
                                (Theme.of(context).brightness == Brightness.dark
                                        ? Colors.white
                                        : Colors.black)
                                    .withOpacity(
                                        _current == entry.key ? 0.9 : 0.4)),
                      ),
                    );
                  }).toList(),
                );
              },
            ),
            SizedBox(
              height: 30,
            ),
            CommonButton(
              size: widget.size,
              width: MediaQuery.of(context).size.width / 2,
              btnTxt: 'Book Appointment',
              onTap: () {
                Provider.of<NavigationProvider>(context, listen: false)
                    .setcurrentIndex(0);
              },
            )
          ],
        ),
      ),
    );
  }
}
