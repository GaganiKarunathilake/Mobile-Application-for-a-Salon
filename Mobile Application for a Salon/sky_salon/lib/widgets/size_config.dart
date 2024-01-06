import 'dart:math';

import 'package:flutter/widgets.dart';

class SizeConfig {
  static double _screenWidth = 0;
  static double _screenHeight = 0;
  static double _blockHeight = 0;

  static double textMultiplier = 0;

  void init(BoxConstraints constraints) {
    _screenWidth = constraints.maxWidth;
    _screenHeight = constraints.maxHeight;

    _blockHeight = _screenHeight / 200;

    textMultiplier = _blockHeight;
  }

  double getPropotionateHeight(double actualHeight) {
    // divide - artboard height that designer use
    return (actualHeight / 2340.0) * _screenHeight;
  }

  double getPropotionateWidth(double actualWidth) {
    //divide - artboard width that designer use
    return (actualWidth / 1080.0) * _screenWidth;
  }

  double getTextSize(double val) {
    // return double.parse((val / textMultiplier).toStringAsFixed(2)) *
    //     textMultiplier;
    // Calculate the diagonal screen size using Pythagorean theorem
    // final screenSize = MediaQuery.of(context).size;
    final diagonalSize =
        sqrt((_screenWidth * _screenWidth) + (_screenHeight * _screenHeight));

    // Adjust the text size based on the diagonal screen size
    final adjustedTextSize = val * (diagonalSize / 1000);

    return adjustedTextSize;
  }
}
