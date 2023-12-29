###
# @format
# -----
# Project: grand_theft_auto
# File: install.py
# Path: /install.py
# Created Date: Sunday, December 3rd 2023
# Author: Jonathan Stevens (Email: jonathan@resnovas.com, Github: https://github.com/TGTGamer)
# -----
# Contributing: Please read through our contributing guidelines. Included are directions for opening
# issues, coding standards, and notes on development. These can be found at https://github.com/grand_theft_auto/blob/develop/CONTRIBUTING.md
#
# Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
# welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/grand_theft_auto/blob/develop/CODE_OF_CONDUCT.md
# -----
# Copyright (c) 2023 Resnovas - All Rights Reserved
# LICENSE: Creative Commons Zero v1.0 Universal (CC0-1.0)
# -----
# This program has been provided under confidence of the copyright holder and is
# licensed for copying, distribution and modification under the terms of
# the Creative Commons Zero v1.0 Universal (CC0-1.0) published as the License,
# or (at your option) any later version of this license.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# Creative Commons Zero v1.0 Universal for more details.
#
# You should have received a copy of the Creative Commons Zero v1.0 Universal
# along with this program. If not, please write to: jonathan@resnovas.com,
# or see https://creativecommons.org/publicdomain/zero/1.0/legalcode
#
# DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE - PLEASE SEE THE LICENSE FILE FOR DETAILS
# -----
# Last Modified: 03-12-2023
# By: Jonathan Stevens (Email: jonathan@resnovas.com, Github: https://github.com/TGTGamer)
# Current Version: <<projectversion>>
###
import frappe  # type: ignore
from erpnext.setup.setup_wizard.operations.install_fixtures import \
    install as install_fixtures  # type: ignore


def setup_database():
    """This function sets up the database for the application.
    It creates the necessary tables and relationships.


    """
    # Code for setting up the database goes here


def initialize_variables():
    """This function initializes the necessary variables for the application.
    It sets the initial values for these variables.


    """
    # Code for initializing variables goes here


def perform_setup_tasks():
    """This function performs other setup tasks for the application.
    These tasks could include things like setting up the user interface,
    loading data, or starting services.


    """
    # Code for performing setup tasks goes here
    install_fixtures("United Kingdom")
    if not frappe.db.exists("Company", "Gaming Community"):
        createParent()

    companies = [
        "Police Constabulary", "Fire Rescue Service", "Ambulance Service"
    ]
    for company in companies:
        if not frappe.db.exists("Company", company):
            createChild(company)
    pass


def createParent():
    """This function creates the parent company for the application.
    This company will be used as the parent for all other companies.


    """
    parent = frappe.new_doc("Company")
    parent.set("company_name", "Gaming Community")
    parent.set("abbr", "GC")
    parent.set("default_currency", "GBP")
    parent.set("country", "United Kingdom")
    parent.set("is_group", True)
    parent.set("create_chart_of_accounts_based_on", "Standard Template")
    parent.set("chart_of_accounts", "Standard with Numbers")
    parent.insert()


def createChild(company: str):
    """This function creates a child company for the application.
    For Grand Theft Auto, this will be the Police Constabulary, Fire Rescue Service, and Ambulance Service.
    These will be used as the main companies for the bulk of the application.

    :param company: str:

    """
    child = frappe.new_doc("Company")
    child.set("company_name", company)
    # get a letter from each word in the company name
    abbr = ""
    for word in company.split():
        abbr += word[0]

    child.set("abbr", abbr)
    child.set("default_currency", "GBP")
    child.set("country", "United Kingdom")
    child.set("parent_company", "Gaming Community")
    child.set("create_chart_of_accounts_based_on", "Existing Company")
    child.set("existing_company", "Gaming Community")
    child.set("allow_account_creation_against_child_company", True)
    child.insert()


def after_install():
    """This function is called after the application is installed.
    It calls other functions to perform setup tasks.


    """
    setup_database()
    initialize_variables()
    perform_setup_tasks()
