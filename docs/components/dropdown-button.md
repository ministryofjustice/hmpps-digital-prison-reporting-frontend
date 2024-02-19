---
layout: layouts/component.njk
title: Dropdown Button
---

{% example "dropdown-button", 300 %}

## When to use

Use this component when you need to group a set of actions/buttons in a dropdown menu.

## When not to use

Do not use this component for common, regulary used actions as hiding these options behind a button could harm accessibility.

## How to use

Menu items can be provided to the dropdown button as hyperlink button data, or as bespoke button components. When a menu item requires a specific action other than a href, and uses Javascript to perform that action, then a bespoke component should be built an passed in as html.
