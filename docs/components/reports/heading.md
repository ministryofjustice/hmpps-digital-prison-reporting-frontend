---
layout: layouts/component.njk
title: Heading
subsection: Report components
---
{% example "report/heading", 430, "default" %}

## Overview

The report heading component displays the important information of a report, and enables all available report actions for the report.

### When to use

Use the Heading component when you need to help users:

- display the report name and report variant name.
- display the report details, inlcuding description and request parameters
- include report actions along side the report. 

## How to use

This component is designed to be used as the heading for a report. It should be included at the top of the report page to allow users to see the report imformaton clearly and immediatley, and highlight what report actions are available.

### Basic usage

Display the report name, variant name and description

{% example "report/heading", 430, "default" %}

### Heading with actions

Display the report information along side the report actions. [See the Actions component]()

{% example "report/heading/actions", 450, "actions" %}
