/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

package models

/**
  * @author : julienderay
  * Created on 22/02/2016
  */

case class Platform(
       originator: String,
       accountId: String,
       apiKey: String,
       primary: PrimaryMarket,
       secondary: SecondaryMarket,
       automatedStrategy: AutomatedStrategy,
       mode: String,
       maximumDailyInvestment: BigDecimal) {
  def originatorEnum = OriginatorEnum.withName(originator)
  def platformModeEnum = PlatformModeEnum.withName(mode)
}

object Platform {
  def factory(originator: String, accountId: String, apiKey: String): Platform =
    Platform(
      OriginatorEnum.withName(originator).toString,
      accountId,
      apiKey,
      PrimaryMarket(Seq[ManualStrategy]()),
      SecondaryMarket(Seq[ManualStrategy](), Seq[ManualStrategy]()),
      AutomatedStrategy.factory(),
      PlatformModeEnum.automated.toString,
      maximumDailyInvestment = 250
    )
}

object OriginatorEnum extends Enumeration {
  type OriginatorEnum = Value
  val lendingClub, prosper, bondora, ratesetter, fundingCircle = Value
}

object PlatformModeEnum extends Enumeration {
  type PlatformModeEnum = Value
  val manual, automated = Value
}