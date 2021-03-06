import React from 'react'
import ClassNames from 'classnames';
import showdown from 'showdown';
import Parser from 'html-react-parser';
import { spinalCase } from '../../utils';

export default class FundamentalItem extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const self = this;
  }

  toggleItem(targetEle) {
    const id = encodeURIComponent(targetEle.id);
    const target = targetEle.parentElement;

    // scroll to selected
    // window.scroll(0, target.offsetTop - 80);

    // reset
    // document.querySelectorAll('.faq-cntr-sec-ls-i')
    //   .forEach((ele, i) => {
    //     if (!ele.isEqualNode(target) && ele.classList.contains('open')) ele.classList.remove('open');
    //   });

    setTimeout(() => {
      // add/remove css class
    if (target.classList.contains('open')) {
      target.classList.remove('open');
      return;
    }
    location.replace(`#${id}`);
    target.classList.add('open');
    }, 100);
  }

  OnClickOpen(e) {
    e.preventDefault();
    this.toggleItem(e.target);
  }

  render() {
    const { data } = this.props;

    const spinalCaseStr = spinalCase(data.title);
    const converter = new showdown.Converter();
    // const parsePara = (str) => {
    //   const converter = new showdown.Converter();
    //   console.log('match', converter.makeHtml(str));
    // }

    return (
      <div className="funda-cntr-sec">
        {data.title ? <h2 className="funda-cntr-sec-h" id={spinalCaseStr}><a href={`#${spinalCaseStr}`}>{data.title}</a></h2> : null}
        <div className="funda-cntr-sec-ls">
          {data.list.length > 0 ? data.list.map((li, i) => {
            return (
              <div key={`funda-item-ls-${i}`} className={ClassNames('funda-cntr-sec-ls-i', {
                green: data.color === 'green',
                orange: data.color === 'orange',
                blue: data.color === 'blue',
                red: data.color === 'red',
                bluegrey: data.color === 'bluegrey',
                greyblue: data.color === 'greyblue',
              })}>
                <div className="funda-cntr-sec-ls-i-h" onClick={(e) => this.OnClickOpen(e)} id={spinalCase(li.q.replace(/[^a-zA-Z ]/g, ""))}>
                  <div className="s-no">{i + 1}</div>
                  <div className="text-content">{li.q}</div>
                </div>
                <div className="funda-cntr-sec-ls-i-ctx">
                  <div className="funda-cntr-sec-ls-i-ctx-b">
                    {
                      li.a.length > 0 ? li.a.map((ans, i) => {
                        if (!ans) {
                          return null;
                        }
                        if (ans.type === 'para') return <div key={`funda-item-ls-p-${i}`}>{Parser(converter.makeHtml(ans.cnt))}</div>;

                        if (ans.type === 'anchor') return <a key={`funda-item-ls-a-${i}`} className="lnk-underline" href={ans.href}>{ans.cnt}</a>;
                      }) : null
                    }
                  </div>
                </div>
              </div>
            )
          }) : null}
        </div>
      </div>
    )
  }
}
