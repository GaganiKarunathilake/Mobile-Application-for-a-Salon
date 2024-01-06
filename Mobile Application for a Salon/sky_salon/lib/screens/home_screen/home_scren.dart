// import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';
import 'package:sky_salon/provider/item_provider.dart';
import 'package:sky_salon/provider/navigation_provider.dart';
import 'package:sky_salon/screens/home_screen/appointment_page.dart';
import 'package:sky_salon/screens/home_screen/cart_page.dart';
import 'package:sky_salon/screens/home_screen/chattab.dart';
import 'package:sky_salon/screens/home_screen/product_page.dart';
import 'package:sky_salon/screens/home_screen/home_tab_page.dart';
import 'package:sky_salon/screens/home_screen/profile_page.dart';
import 'package:sky_salon/widgets/color_constants.dart';
import 'package:sky_salon/widgets/common_button.dart';
// import 'package:sky_salon/widgets/common_input_field.dart';
import 'package:sky_salon/widgets/size_config.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    var size = SizeConfig();

    var pages = [
      AppointmentPage(),
      CartPage(),
      HomeTabPage(size: size),
      ChatTab(),
      ProductPage(),
      ProfilePage(size: size),
    ];

    return SafeArea(
      child: Scaffold(
        drawer: Drawer(
          child: Consumer<NavigationProvider>(
            builder: (context, value, child) {
              return Column(
                children: [
                  ListTile(
                    title: Text('Home'),
                    leading: Icon(Icons.home),
                    onTap: () {
                      setState(() => value.setcurrentIndex(2));
                      Navigator.pop(context);
                    },
                  ),
                  ListTile(
                    title: Text('Appointment'),
                    leading: Icon(Icons.receipt_long),
                    onTap: () {
                      setState(() => value.setcurrentIndex(0));
                      Navigator.pop(context);
                    },
                  ),
                  ListTile(
                    title: Text('Specialist'),
                    leading: Icon(Icons.list),
                    onTap: () {
                      setState(() => value.setcurrentIndex(3));
                      Navigator.pop(context);
                    },
                  ),
                  ListTile(
                    title: Text('Reviews'),
                    leading: Icon(Icons.notifications),
                  ),
                  ListTile(
                    title: Text('Chat'),
                    leading: Icon(Icons.chat),
                  ),
                  ListTile(
                    title: Text('Help'),
                    leading: Icon(Icons.help),
                  ),
                  ListTile(
                    title: Text('Payment History'),
                    leading: Icon(Icons.payment),
                  ),
                  ListTile(
                    title: Text('Profile'),
                    leading: Icon(Icons.person),
                    onTap: () {
                      setState(() => value.setcurrentIndex(5));
                      Navigator.pop(context);
                    },
                  ),
                  Spacer(),
                  CommonButton(
                    size: size,
                    btnTxt: 'Logout',
                    onTap: () {},
                  ),
                  SizedBox(
                    height: 50,
                  )
                ],
              );
            },
          ),
        ),
        bottomNavigationBar: Consumer<NavigationProvider>(
          builder: (context, value, child) {
            return SalomonBottomBar(
              backgroundColor: kScaffoldBackgroundColor,
              currentIndex: value.getcurrentIndex,
              onTap: (i) => setState(() => value.setcurrentIndex(i)),
              items: [
                SalomonBottomBarItem(
                  icon: const Icon(Icons.receipt_long),
                  title: const Text(
                    "Appointment",
                    style: TextStyle(fontSize: 8),
                  ),
                  selectedColor: kLogoColor2,
                ),
                SalomonBottomBarItem(
                  icon: Consumer<ItemProvider>(
                    builder: (context, value, child) {
                      return Stack(
                        children: [
                          const Icon(Icons.shopping_cart),
                          if (value.getcartItems.isNotEmpty)
                            Positioned(
                              right: 0,
                              top: 0,
                              child: Container(
                                decoration: BoxDecoration(
                                  color: Colors.red,
                                  shape: BoxShape.circle,
                                ),
                                padding: EdgeInsets.all(2),
                                child: Text(
                                  "${value.getcartItems.length}",
                                  style: TextStyle(color: kScaffoldBackgroundColor, fontSize: 8),
                                ),
                              ),
                            ),
                        ],
                      );
                    },
                  ),
                  title: const Text("Cart"),
                  selectedColor: kLogoColor2,
                ),
                SalomonBottomBarItem(
                  icon: const Icon(Icons.home),
                  title: const Text("Home"),
                  selectedColor: kLogoColor2,
                ),
                SalomonBottomBarItem(
                  icon: const Icon(Icons.message),
                  title: const Text(
                    "Specialist",
                    style: TextStyle(fontSize: 8),
                  ),
                  selectedColor: kLogoColor2,
                ),
                SalomonBottomBarItem(
                  icon: const Icon(Icons.shopping_bag),
                  title: const Text("Product"),
                  selectedColor: kLogoColor2,
                ),
                SalomonBottomBarItem(
                  icon: const Icon(Icons.person),
                  title: const Text("Profile"),
                  selectedColor: kLogoColor2,
                ),
              ],
            );
          },
        ),
        appBar: AppBar(
          backgroundColor: kLogoColor2,
          title: Text('SKY SALON'),
        ),
        body: Consumer<NavigationProvider>(
          builder: (context, value, child) {
            return pages.elementAt(value.getcurrentIndex);
          },
        ),
      ),
    );
  }
}
