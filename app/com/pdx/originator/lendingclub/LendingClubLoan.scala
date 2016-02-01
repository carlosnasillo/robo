/**
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */
package com.pdx.originator.lendingclub

import java.time.ZonedDateTime

/**
 * @author ze97286
 */

case class LendingClubLoan(
    id: Int,
    memberId: Int,
    loanAmount: Double,
    fundedAmount: Double,
    term: Int,
    intRate: Double,
    expDefaultRate: Double,
    serviceFeeRate: Double,
    installment: Double,
    grade: String,
    subGrade: String,
    empLength: Option[Int],
    homeOwnership: Option[String],
    annualInc: Option[Double],
    listD: ZonedDateTime,
    reviewStatusD: Option[ZonedDateTime],
    reviewStatus: String,
    desc: Option[String],
    purpose: String,
    addrZip: Option[String],
    addrState: Option[String],
    investorCount: Option[Int]) {
  val termEnum = term match {
    case 24 => Term._24
    case 36 => Term._36
    case 60 => Term._60
    case _  => throw new IllegalArgumentException("unsupported term")
  }

  val gradeEnum = Grade.withName(grade)
  val homeOwnershipEnum = HomeOwnership.withName(homeOwnership.get)
  val reviewStatusEnum = ReviewStatus.withName(reviewStatus)
  val purposeEnum = Purpose.withName(purpose)
}
  
