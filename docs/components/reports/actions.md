---
layout: layouts/component.njk
title: Actions
subsection: Report components
---
{% example "report/actions", 170, 'default' %}

## Overview

Report actions are designed to allow users to perform basic and most commonly used tasks on a report.

### When to use

Use the Actions component when report users need to:

- Print a report
- Share a report with another user
- Copy the report URL

## Availabe actions

- [Print screen](#print-screen)
- [Copy](#copy)
- [Share](#share)
- [Refresh](#refresh) (requires platform integration)
- [Download](#download) (requires platform integration)

## How to use

### Basic

{% example "report/actions", 170, 'default' %}

### Disable actions

{% example "report/actions/disabled", 170, 'disabled' %}


## Actions 
### Print screen

The print screen action enables the user to print the visible contents of their current screen.

This action will open up the print window in your browser for the user to configure the print conditions. 

> **NOTE:** The print screen action will not print the entire report by default as the action will only print the contents visisble on the screen. To print the entire report the user will need to update the "rows per page" input of the report to `All` and then click print. 

{% example "report/actions/print", 170, 'print' %}

### Copy

The Copy action will copy the current URL to the clipboard

{% example "report/actions/copy", 170, 'copy' %}

### Share

The Share action open up your email client and populate it with a relevant subject name, and add the report URL to the body of the email

{% example "report/actions/share", 170, 'share' %}

### Refresh

The refresh action navigates the user back to the request page in order to update their request parameters, and re-request their report. Requires  [platform integration](/integration-guides/integrating-the-platform)

### Download

The download action enables users to download the full dataset as a CSV. Requires  [platform integration](/integration-guides/integrating-the-platform)
