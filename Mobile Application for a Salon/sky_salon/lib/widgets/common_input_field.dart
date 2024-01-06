import 'package:flutter/material.dart';
import 'package:sky_salon/widgets/color_constants.dart';
import 'package:sky_salon/widgets/size_config.dart';

class CommonInputField extends StatelessWidget {
  const CommonInputField({
    super.key,
    required this.size,
    this.placeholder,
    this.prefixIcon,
    this.padding,
    this.borderColor,
    this.width = 327,
    this.textEditingController,
    this.obscureText = false,
    this.fillColor,
    this.suffixIcon,
    this.textAlign = TextAlign.start,
    this.keyboardType,
  });

  final SizeConfig size;
  final String? placeholder;
  final Widget? prefixIcon;
  final EdgeInsetsGeometry? padding;
  final Color? borderColor;
  final double width;
  final TextEditingController? textEditingController;
  final bool obscureText;
  final Color? fillColor;
  final Widget? suffixIcon;
  final TextAlign textAlign;
  final TextInputType? keyboardType;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size.getPropotionateWidth(width),
      // decoration: BoxDecoration(
      //   borderRadius: BorderRadius.circular(14),
      //   border: Border.all(color: borderColor ?? kTextBorderColor),
      // ),
      child: Container(
        // padding: padding ??
        //     EdgeInsets.symmetric(horizontal: size.getPropotionateWidth(16)),
        child: TextFormField(
          textAlign: textAlign,
          obscureText: obscureText,
          controller: textEditingController,
          keyboardType: keyboardType,
          // initialValue: placeholder == null ? 'asdad' : null,
          decoration: InputDecoration(
            fillColor: fillColor,
            filled: fillColor != null,
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: BorderSide(color: borderColor ?? kTextBorderColor),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: BorderSide(color: borderColor ?? kTextBorderColor),
            ),
            disabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: BorderSide(color: borderColor ?? kTextBorderColor),
            ),
            labelText: placeholder,
            prefixIcon: prefixIcon,
            suffixIcon: suffixIcon,
            // prefixIconConstraints: BoxConstraints(
            //   //   maxWidth: size.getPropotionateWidth(80),
            //   maxHeight: size.getPropotionateWidth(80),
            // ),

            border: InputBorder.none,
            hintText: placeholder,
            hintStyle: TextStyle(
              color: kPlaceHolderTextColor,
              fontSize: size.getTextSize(16),
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ),
    );
  }
}
