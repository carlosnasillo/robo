/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

package core

import models._
import play.api.data.Form
import play.api.data.Forms._

/**
  * @author : julienderay
  * Created on 27/01/2016
  */

object Forms {
  def registerForm = Form(
    mapping (
      "_id" -> email,
      "password" -> nonEmptyText,
      "terms" -> nonEmptyText,
      "reason" -> nonEmptyText,
      "income" -> nonEmptyText,
      "timeline" -> nonEmptyText,
      "birthday" -> date("MM/dd/yyyy"),
      "platforms" -> seq(platformMapping),
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "token" -> ignored(Hash.createToken)
    )(User.apply)(User.unapply)
  )

  def platformMapping = mapping(
      "originator" -> nonEmptyText,
      "accountId" -> nonEmptyText,
      "apiKey" -> nonEmptyText,
      "primary" -> marketMapping,
      "secondary" -> marketMapping,
      "autoEnabled" -> boolean
    )(Platform.apply)(Platform.unapply)

  def marketMapping = mapping(
    "strategy" -> nonEmptyText,
    "rules" -> seq(ruleMapping)
  )(Market.apply)(Market.unapply)

  def addPlatformForm = Form(
    mapping(
      "email" -> email,
      "platform" -> platformMapping
    )(AddPlatform.apply)(AddPlatform.unapply)
  )

  def loginForm = Form(
    mapping(
      "email" -> email,
      "password" -> nonEmptyText
    )(Login.apply)(Login.unapply)
  )

  def updatePasswordForm = Form(
    mapping(
      "email" -> email,
      "oldPassword" -> nonEmptyText,
      "newPassword" -> nonEmptyText
    )(UpdatePassword.apply)(UpdatePassword.unapply)
  )

  def updatePlatforms = Form(
    mapping(
      "email" -> email,
      "platforms" -> seq(platformMapping)
    )(UpdatePlatforms.apply)(UpdatePlatforms.unapply)
  )

  def updatePersonalData = Form(
    mapping(
      "email" -> email,
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "birthday" -> date("MM/dd/yyyy")
    )(UpdatePersonalData.apply)(UpdatePersonalData.unapply)
  )

  def destroyAccountForm = Form(
    mapping(
      "email" -> email,
      "password" -> nonEmptyText
    )(DestroyAccount.apply)(DestroyAccount.unapply)
  )

  def updateRules = Form(
    mapping(
      "email" -> email,
      "rules" -> seq(ruleMapping),
      "platform" -> nonEmptyText,
      "market" -> nonEmptyText
    )(UpdateRules.apply)(UpdateRules.unapply)
  )

  def ruleMapping = mapping(
     "id" -> nonEmptyText,
     "name" -> nonEmptyText,
     "originator" -> nonEmptyText,
     "expectedReturn" -> expectedReturnMapping,
     "loansAvailablePerWeek" -> bigDecimal,
     "moneyAvailablePerWeek" -> bigDecimal,
     "criteria" -> seq(criterionMapping),
     "isEnabled" -> boolean,
     "minNoteAmount" -> bigDecimal,
     "maxNoteAmount" -> bigDecimal,
     "maximumDailyInvestment" -> bigDecimal
     )(Rule.apply)(Rule.unapply)

  def expectedReturnMapping = mapping(
     "value" -> bigDecimal,
     "percent" -> bigDecimal,
     "margin" -> bigDecimal
  )(ExpectedReturn.apply)(ExpectedReturn.unapply)

  def criterionMapping = mapping(
    "attribute" -> nonEmptyText,
    "ruleType" -> nonEmptyText, // InSet, InRange
    "ruleParams" -> nonEmptyText // format: for InSet: coma separated values, for InRange: lower bound, upperbound 
    // todo : validate that it is a valid key
  )(Criterion.apply)(Criterion.unapply)
}
