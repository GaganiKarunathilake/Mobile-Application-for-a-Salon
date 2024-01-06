import 'package:flutter/material.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:sky_salon/widgets/color_constants.dart';

class CommonSeachableDrop2 extends StatelessWidget {
  const CommonSeachableDrop2({
    super.key,
    required this.items,
    required this.value,
    required this.onChanged,
    required this.searchController,
    required this.controller,
    required this.searchMatchFn,
    required this.hint,
    this.trailingIcon,
  });

  final List<DropdownMenuItem<dynamic>>? items;
  final dynamic value;
  final void Function(dynamic)? onChanged;
  final TextEditingController? searchController;
  final TextEditingController? controller;
  final bool Function(DropdownMenuItem<dynamic>, String)? searchMatchFn;
  final String hint;
  final Widget? trailingIcon;

  @override
  Widget build(BuildContext context) {
    return Container(
      // padding: const EdgeInsets.all(8.0),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(7.5),
        decoration: BoxDecoration(
          // color: kDropBackground,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: kTextBorderColor,
          ),
        ),
        child: DropdownButtonHideUnderline(
          child: DropdownButton2<dynamic>(
            style: const TextStyle(
              color: kTxtColor,
              fontWeight: FontWeight.bold,
            ),

            isExpanded: true,
            hint: Text(
              hint,
              style: TextStyle(
                fontSize: 14,
                color: Theme.of(context).hintColor,
              ),
            ),
            items: items,
            value: value,
            onChanged: onChanged,
            iconStyleData: IconStyleData(
                icon: trailingIcon ?? const Icon(Icons.arrow_drop_down)),
            buttonStyleData: const ButtonStyleData(
              height: 40,
              width: 200,
            ),
            dropdownStyleData: const DropdownStyleData(
              maxHeight: 200,
            ),
            menuItemStyleData: const MenuItemStyleData(
              height: 40,
            ),
            dropdownSearchData: DropdownSearchData(
              searchController: searchController,
              searchInnerWidgetHeight: 50,
              searchInnerWidget: Container(
                height: 50,
                padding: const EdgeInsets.only(
                  top: 8,
                  bottom: 4,
                  right: 8,
                  left: 8,
                ),
                child: TextFormField(
                  expands: true,
                  maxLines: null,
                  controller: controller,
                  decoration: InputDecoration(
                    isDense: true,
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 8,
                    ),
                    hintText: 'Search for an item...',
                    hintStyle: const TextStyle(fontSize: 12),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ),
              ),
              searchMatchFn: searchMatchFn,
            ),
            //This to clear the search value when you close the menu
            onMenuStateChange: (isOpen) {
              if (!isOpen) {
                searchController!.clear();
                controller!.clear();
              }
            },
          ),
        ),
      ),
    );
  }
}
