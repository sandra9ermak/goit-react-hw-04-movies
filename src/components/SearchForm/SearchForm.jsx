import s from "../../views/Views.module.css";
import PropTypes from "prop-types";

const SearchForm = ({ onSubmit, onChange }) => {
    return (
        <form className={s.searchForm} onSubmit={onSubmit}>
        <input
          onChange={onChange}
          className={s.inputForm}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit" className={s.searchButton}>
          Search
        </button>
      </form>
    )
}

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}