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

case class ManualStrategy(
                           id: String,
                           name: String,
                           originator: String,
                           expectedReturn: ExpectedReturn,
                           loansAvailablePerWeek: BigDecimal,
                           moneyAvailablePerWeek: BigDecimal,
                           rules: Seq[Rule],
                           isEnabled: Boolean,
                           minNoteAmount: BigDecimal,
                           maxNoteAmount: BigDecimal
    ) {
  def originatorEnum = OriginatorEnum.withName(originator)
}

case class ExpectedReturn(
       value: BigDecimal,
       percent: BigDecimal,
       margin: BigDecimal)