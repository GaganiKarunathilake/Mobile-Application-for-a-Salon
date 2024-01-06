import 'package:flutter/material.dart';

class NavigationProvider extends ChangeNotifier {
  int currentIndex = 0;
  int get getcurrentIndex => currentIndex;
  setcurrentIndex(val) {
    currentIndex = val;
    notifyListeners();
  }
}
