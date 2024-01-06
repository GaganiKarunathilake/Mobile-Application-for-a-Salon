import 'package:flutter/material.dart';
import 'package:sky_salon/widgets/color_constants.dart';
import 'package:sky_salon/widgets/size_config.dart';

class CommonButton extends StatelessWidget {
  const CommonButton({
    super.key,
    required this.size,
    required this.btnTxt,
    this.btnColor,
    required this.onTap,
    this.width,
    this.padding = const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
    this.txtColor,
  });

  final SizeConfig size;
  final String btnTxt;
  final Color? btnColor;
  final void Function()? onTap;
  final double? width;
  final EdgeInsetsGeometry padding;
  final Color? txtColor;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: width,
        constraints: width == null
            ? null
            : BoxConstraints(minWidth: size.getPropotionateWidth(128)),
        decoration: BoxDecoration(
          color: btnColor ?? kBtnPrimaryColor,
          borderRadius: BorderRadius.circular(12),
        ),
        // alignment: Alignment.center,
        child: Padding(
          padding: padding,
          child: FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(
              btnTxt,
              style: TextStyle(
                color: txtColor ?? kTxtColor,
                fontWeight: FontWeight.w600,
                fontSize: size.getTextSize(17),
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ),
    );
  }
}
