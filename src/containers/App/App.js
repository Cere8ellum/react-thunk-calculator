import commonStyles from "../../assets/scss/common.scss";
import styles from "./app.scss";
import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import * as calcSelectors from "../../core/redux/reducers/calcReducer/calcSelector";
import * as calcTypes from "../../core/redux/actions/calcAction";
import Heading from "../../components/Heading/heading";
import InputWrapper from "../../components/InputWrapper/inputWrapper";
import Label from "../../components/Label/label";
import Input from "../../components/Input/input";
import InputRange from "../../components/InputRange/inputRange";
import InfoField from "../../components/InfoField/infoField";
import Button from "../../components/Button/button";
import Alert from "../../components/Alert/Alert";
import { PulseLoader } from "react-spinners";
import { checkCondition } from "../../assets/js/functions";

const INPUT_OPTIONS = {
  carPrice: {
    min: 1000000,
    max: 6000000,
  },
  initialFee: {
    min: 10,
    max: 60,
  },
  leaseTerm: {
    min: 1,
    max: 60,
  },
};

function App({ handleSubmit }) {
  const dispatch = useDispatch();

  /************************************** Error */
  const error = useSelector(calcSelectors.errorSelector);
  const hideError = () => {
    dispatch(calcTypes.setError());
  };

  /************************************** Success */
  const result = useSelector(calcSelectors.resultSelector);
  const hideResult = () => {
    dispatch(calcTypes.setResult());
  };

  // Loading
  const loading = useSelector(calcSelectors.submitSelector);

  /************************************** Car price */
  const { value: carPrice, typingValue: carPriceTyping } = useSelector(
    calcSelectors.carPriceSelector
  );

  const changeCarPrice = (e) => {
    dispatch(calcTypes.setCarPriceTyping(e.target.value));
  };
  const changeCarPriceWithTolerance = (e) => {
    dispatch(
      calcTypes.setCarPrice(
        checkCondition(
          INPUT_OPTIONS.carPrice.min,
          INPUT_OPTIONS.carPrice.max,
          e.target.value
        )
      )
    );
  };
  /************************************** Initial fee */
  let { value: initFee, typingValue: initFeeTyping } = useSelector(
    calcSelectors.initialFeeSelector
  );

  // % to RUR
  initFeeTyping =
    initFeeTyping === 0 ? (carPrice / 100) * initFee : initFeeTyping;
  const percented = initFee + "%";

  const changeInitFee = (e) => {
    dispatch(calcTypes.setInitFeeTyping(e.target.value));
  };
  // RUR to %
  const changeInitFeeWithToleranceRur = (e) => {
    dispatch(
      calcTypes.setInitFee(
        checkCondition(
          INPUT_OPTIONS.initialFee.min,
          INPUT_OPTIONS.initialFee.max,
          Math.round((e.target.value / carPrice) * 100)
        )
      )
    );
  };
  // %
  const changeInitFeeWithTolerancePercent = (e) => {
    dispatch(
      calcTypes.setInitFee(
        checkCondition(
          INPUT_OPTIONS.initialFee.min,
          INPUT_OPTIONS.initialFee.max,
          e.target.value
        )
      )
    );
  };
  /************************************** Lease term */
  const { value: leaseTerm, typingValue: leaseTermTyping } = useSelector(
    calcSelectors.leaseTermSelector
  );

  const changeLeaseTerm = (e) => {
    dispatch(calcTypes.setLeaseTermTyping(e.target.value));
  };
  const changeLeaseTermWithTolerance = (e) => {
    dispatch(
      calcTypes.setLeaseTerm(
        checkCondition(
          INPUT_OPTIONS.leaseTerm.min,
          INPUT_OPTIONS.leaseTerm.max,
          e.target.value
        )
      )
    );
  };

  /************************************** Month fee & summary */
  const percent = 0.035;
  let monthFee =
    (carPrice - initFee) *
    ((percent * Math.pow(1 + percent, leaseTerm)) /
      (Math.pow(1 + percent, leaseTerm) - 1));
  monthFee = Math.floor(monthFee);
  const leaseSummary = initFee + leaseTerm * monthFee;

  /************************************** IDs */
  const carPriceId = "car-price";
  const initFeeId = "init-fee";
  const leaseTermId = "lease-term";

  return (
    <main>
      <div className={styles.container}>
        {error.status && (
          <div className={styles.info}>
            <Alert title={error.text} style={"error"} handleClose={hideError} />
          </div>
        )}
        {result && (
          <div className={styles.info}>
            <Alert title={result} style={"success"} handleClose={hideResult} />
          </div>
        )}
        <Heading title="Рассчитайте стоимость автомобиля в лизинг" />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.carPrice}>
            <InputWrapper icon="₽">
              <Label
                title="Стоимость автомобиля"
                inputId={carPriceId}
                css={commonStyles.label}
              />
              <Input
                type="number"
                id={carPriceId}
                value={carPriceTyping}
                onChange={changeCarPrice}
                onBlur={changeCarPriceWithTolerance}
                disabled={loading}
              />
              <InputRange
                id={carPriceId}
                value={carPrice}
                onChange={changeCarPriceWithTolerance}
                disabled={loading}
                min="1000000"
                max="6000000"
                step="10000"
              />
            </InputWrapper>
          </div>
          <div className={styles.initFee}>
            <InputWrapper icon={percented}>
              <Label
                title="Первоначальный взнос"
                inputId={initFeeId}
                css={commonStyles.label}
              />
              <Input
                type="number"
                id={initFeeId}
                value={initFeeTyping}
                onChange={changeInitFee}
                onBlur={changeInitFeeWithToleranceRur}
                disabled={loading}
              />
              <InputRange
                id={initFeeId}
                value={initFee}
                onChange={changeInitFeeWithTolerancePercent}
                disabled={loading}
                min="10"
                max="60"
                step="1"
              />
            </InputWrapper>
          </div>
          <div className={styles.leaseTerm}>
            <InputWrapper icon="мес.">
              <Label
                title="Срок лизинга"
                inputId={leaseTermId}
                css={commonStyles.label}
              />
              <Input
                type="number"
                id={leaseTermId}
                value={leaseTermTyping}
                onChange={changeLeaseTerm}
                onBlur={changeLeaseTermWithTolerance}
                disabled={loading}
              />
              <InputRange
                id={leaseTermId}
                value={leaseTerm}
                onChange={changeLeaseTermWithTolerance}
                disabled={loading}
                min="10"
                max="60"
                step="1"
              />
            </InputWrapper>
          </div>

          <div className={styles.leaseSummary}>
            <InfoField
              title="Сумма договора лизинга"
              value={leaseSummary}
              css={commonStyles.label}
            />
          </div>
          <div className={styles.monthFee}>
            <InfoField
              title="Ежемесячный платеж от"
              value={monthFee}
              css={commonStyles.label}
            />
          </div>
          <div className={styles.button}>
            <Button
              title={
                loading ? <PulseLoader color="#ffffff" /> : "Оставить заявку"
              }
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </main>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (e) => {
      e.preventDefault();
      dispatch(calcTypes.getCalcResult());
    },
  };
};
export default connect(null, mapDispatchToProps)(App);
